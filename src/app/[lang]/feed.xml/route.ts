import assert from 'assert'
import * as cheerio from 'cheerio'
import { Feed } from 'feed'

import { getDictionary } from '@/i18n'
import { isLocale, localePath } from '@/i18n/config'
import { getAllArticles } from '@/lib/articles'
import { CONTACT_EMAIL, SITE_NAME, SITE_URL } from '@/lib/site'

export async function GET(
  req: Request,
  { params }: { params: { lang: string } },
) {
  if (!isLocale(params.lang)) return new Response('Not found', { status: 404 })
  let lang = params.lang
  let t = getDictionary(lang)

  let author = { name: SITE_NAME, email: CONTACT_EMAIL }

  let feed = new Feed({
    title: author.name,
    description: t.articles.rssTitle,
    author,
    id: SITE_URL,
    link: SITE_URL,
    language: lang,
    image: `${SITE_URL}/favicon.ico`,
    favicon: `${SITE_URL}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${SITE_URL}${localePath(lang, '/feed.xml')}`,
    },
  })

  // The Japanese feed only lists posts that actually have a translation.
  let posts = getAllArticles(lang).filter((a) => a.contentLang === lang)

  for (let post of posts) {
    let path = localePath(lang, `/articles/${post.slug}`)
    let html = await (await fetch(new URL(path, req.url))).text()
    let $ = cheerio.load(html)

    let article = $('article').first()
    let title = article.find('h1').first().text()
    let content = article.find('[data-mdx-content]').first().html()

    assert(typeof title === 'string')
    assert(typeof content === 'string')

    // Translations are dated by when they were translated, so subscribers
    // see them as new.
    let date = lang === 'ja' ? post.translatedDate ?? post.date : post.date

    feed.addItem({
      title,
      id: `${SITE_URL}${path}`,
      link: `${SITE_URL}${path}`,
      content,
      author: [author],
      contributor: [author],
      date: new Date(date),
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
