/** The element the page scrolls in: #scroller on phones, the window otherwise. */
function innerScroller() {
  if (typeof document === 'undefined') return null
  let el = document.getElementById('scroller')
  return el && getComputedStyle(el).overflowY === 'auto' ? el : null
}

export function pageScrollY() {
  let el = innerScroller()
  return el ? el.scrollTop : window.scrollY
}

export function pageScrollMax() {
  let el = innerScroller()
  return el
    ? el.scrollHeight - el.clientHeight
    : document.body.scrollHeight - window.innerHeight
}

export function scrollPageToTop() {
  let el = innerScroller()
  if (el) el.scrollTop = 0
}
