import { allCoreContent } from 'pliny/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { sortPostsByUpdate } from '@/lib/utils'
import Main from './Main'

export default async function Page() {
  const sortedPosts = sortPostsByUpdate(allBlogs)
  const posts = allCoreContent(sortedPosts)
  return <Main posts={posts} />
}
