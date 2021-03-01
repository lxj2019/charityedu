import defaultSettings from '@/settings'

const title = defaultSettings.title || '惠师惠学'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
