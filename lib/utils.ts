import type { Blog } from 'contentlayer/generated'

/**
 * Sort posts by update date (if present) or date, newest first
 */
export function sortPostsByUpdate<T extends Pick<Blog, 'date' | 'update' | 'draft'>>(
  posts: T[]
): T[] {
  return posts
    .filter((post) => !post.draft)
    .sort((a, b) => {
      const dateA = a.update || a.date
      const dateB = b.update || b.date
      return new Date(dateB).getTime() - new Date(dateA).getTime()
    })
}
