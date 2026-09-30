import { type Metadata } from 'next'

import { Card } from '@/components/Card'
import { Reveal } from '@/components/Reveal'
import { SimpleLayout } from '@/components/SimpleLayout'
import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }: { article: ArticleWithSlug }) {
  return (
    <Reveal as="article" className="md:grid md:grid-cols-4 md:items-baseline">
      <Card className="md:col-span-3">
        <Card.Title href={`/articles/${article.slug}`}>
          {article.title}
        </Card.Title>
        <Card.Eyebrow
          as="time"
          dateTime={article.date}
          className="md:hidden"
          decorate
        >
          {formatDate(article.date)}
        </Card.Eyebrow>
        <Card.Description>{article.description}</Card.Description>
        <Card.Cta>Read article</Card.Cta>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden md:pl-6"
      >
        {formatDate(article.date)}
      </Card.Eyebrow>
    </Reveal>
  )
}

export const metadata: Metadata = {
  title: 'Writing',
  description:
    'Thoughts on software, learning Japanese, cars, and whatever else I’m chewing on, newest first.',
  alternates: { canonical: '/articles' },
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing on software, learning, Japanese, and life."
      intro="Long-form thoughts on programming, learning, languages, leadership, cars, and more, newest first. Also available over RSS."
    >
      <div className="flex max-w-3xl flex-col space-y-8">
        {articles.map((article) => (
          <Article key={article.slug} article={article} />
        ))}
      </div>
    </SimpleLayout>
  )
}
