import { WEBSITE_HOST_URL } from '@/lib/constants'
import { posts } from '#site/posts'

export default async function sitemap() {
  const postRoutes = posts.map((post) => ({
    url: `${WEBSITE_HOST_URL}${post.url}`,
    lastModified: post.date,
  }))

  const routes = ['', '/about'].map((route) => ({
    url: `${WEBSITE_HOST_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return [...routes, ...postRoutes]
}
