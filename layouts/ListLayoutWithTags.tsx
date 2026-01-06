/* eslint-disable jsx-a11y/anchor-is-valid */
'use client'

import { usePathname } from 'next/navigation'
import { slug } from 'github-slugger'
import { formatDate } from 'pliny/utils/formatDate'
import { CoreContent } from 'pliny/utils/contentlayer'
import type { Blog } from 'contentlayer/generated'
import Link from '@/components/Link'
import Tag from '@/components/Tag'
import Image from '@/components/Image'
import siteMetadata from '@/data/siteMetadata'
import tagData from 'app/tag-data.json'

// Import categorized tag data
let tagDataCategorized: {
  counts: {
    artist: Record<string, number>
    movement: Record<string, number>
    location: Record<string, number>
    tag: Record<string, number>
  }
  displayValues: {
    artist: Record<string, string>
    movement: Record<string, string>
    location: Record<string, string>
    tag: Record<string, string>
  }
} = {
  counts: { artist: {}, movement: {}, location: {}, tag: {} },
  displayValues: { artist: {}, movement: {}, location: {}, tag: {} },
}

try {
  tagDataCategorized = require('app/tag-data-categorized.json')
} catch {
  // File doesn't exist yet
}

interface PaginationProps {
  totalPages: number
  currentPage: number
}
interface ListLayoutProps {
  posts: CoreContent<Blog>[]
  title: string
  initialDisplayPosts?: CoreContent<Blog>[]
  pagination?: PaginationProps
}

function Pagination({ totalPages, currentPage }: PaginationProps) {
  const pathname = usePathname()
  const basePath = pathname.split('/')[1]
  const prevPage = currentPage - 1 > 0
  const nextPage = currentPage + 1 <= totalPages

  return (
    <div className="space-y-2 pb-8 pt-6 md:space-y-5">
      <nav className="flex justify-between">
        {!prevPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!prevPage}>
            Previous
          </button>
        )}
        {prevPage && (
          <Link
            href={currentPage - 1 === 1 ? `/${basePath}/` : `/${basePath}/page/${currentPage - 1}`}
            rel="prev"
          >
            Previous
          </Link>
        )}
        <span>
          {currentPage} of {totalPages}
        </span>
        {!nextPage && (
          <button className="cursor-auto disabled:opacity-50" disabled={!nextPage}>
            Next
          </button>
        )}
        {nextPage && (
          <Link href={`/${basePath}/page/${currentPage + 1}`} rel="next">
            Next
          </Link>
        )}
      </nav>
    </div>
  )
}

// Helper component for rendering a category section in sidebar
function CategorySection({
  title,
  basePath,
  counts,
  displayValues,
  pathname,
}: {
  title: string
  basePath: string
  counts: Record<string, number>
  displayValues: Record<string, string>
  pathname: string
}) {
  const keys = Object.keys(counts)
  if (keys.length === 0) return null

  const sortedKeys = keys.sort((a, b) => counts[b] - counts[a]).slice(0, 10) // Show top 10

  return (
    <div className="mb-4">
      <Link
        href={basePath}
        className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
      >
        {title}
      </Link>
      <ul>
        {sortedKeys.map((key) => {
          const displayName = displayValues[key] || key
          const isActive = pathname === `${basePath}/${key}`
          return (
            <li key={key} className="my-1">
              {isActive ? (
                <span className="inline px-3 py-1 text-sm font-bold text-primary-500">
                  {`${displayName} (${counts[key]})`}
                </span>
              ) : (
                <Link
                  href={`${basePath}/${key}`}
                  className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                  aria-label={`View ${displayName}`}
                >
                  {`${displayName} (${counts[key]})`}
                </Link>
              )}
            </li>
          )
        })}
        {keys.length > 10 && (
          <li className="my-1">
            <Link
              href={basePath}
              className="px-3 py-1 text-sm font-medium italic text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-500"
            >
              View all {keys.length}...
            </Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default function ListLayoutWithTags({
  posts,
  title,
  initialDisplayPosts = [],
  pagination,
}: ListLayoutProps) {
  const pathname = usePathname()
  const tagCounts = tagData as Record<string, number>
  const tagKeys = Object.keys(tagCounts)
  const sortedTags = tagKeys.sort((a, b) => tagCounts[b] - tagCounts[a])

  // Get categorized data
  const { counts: categorizedCounts, displayValues } = tagDataCategorized

  const displayPosts = initialDisplayPosts.length > 0 ? initialDisplayPosts : posts

  return (
    <>
      <div>
        <div className="pb-6 pt-6">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:hidden sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            {title}
          </h1>
        </div>
        <div className="flex sm:space-x-24">
          <div className="hidden h-full max-h-screen min-w-[280px] max-w-[280px] flex-wrap overflow-auto rounded bg-gray-50 pt-5 shadow-md dark:bg-gray-900/70 dark:shadow-gray-800/40 sm:flex">
            <div className="px-6 py-4">
              {pathname.startsWith('/blog') ? (
                <h3 className="font-bold uppercase text-primary-500">All Works</h3>
              ) : (
                <Link
                  href={`/blog`}
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  All Works
                </Link>
              )}

              {/* Categorized sections */}
              <div className="mt-4">
                <CategorySection
                  title="Artists"
                  basePath="/artists"
                  counts={categorizedCounts.artist}
                  displayValues={displayValues.artist}
                  pathname={pathname}
                />
                <CategorySection
                  title="Movements"
                  basePath="/movements"
                  counts={categorizedCounts.movement}
                  displayValues={displayValues.movement}
                  pathname={pathname}
                />
                <CategorySection
                  title="Locations"
                  basePath="/locations"
                  counts={categorizedCounts.location}
                  displayValues={displayValues.location}
                  pathname={pathname}
                />
              </div>

              {/* Generic tags section */}
              <div className="mt-4">
                <Link
                  href="/tags"
                  className="font-bold uppercase text-gray-700 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                >
                  Tags
                </Link>
                <ul>
                  {sortedTags.slice(0, 15).map((t) => {
                    return (
                      <li key={t} className="my-1">
                        {pathname.split('/tags/')[1] === slug(t) ? (
                          <span className="inline px-3 py-1 text-sm font-bold text-primary-500">
                            {`${t} (${tagCounts[t]})`}
                          </span>
                        ) : (
                          <Link
                            href={`/tags/${slug(t)}`}
                            className="px-3 py-1 text-sm font-medium text-gray-500 hover:text-primary-500 dark:text-gray-300 dark:hover:text-primary-500"
                            aria-label={`View posts tagged ${t}`}
                          >
                            {`${t} (${tagCounts[t]})`}
                          </Link>
                        )}
                      </li>
                    )
                  })}
                  {sortedTags.length > 15 && (
                    <li className="my-1">
                      <Link
                        href="/tags"
                        className="px-3 py-1 text-sm font-medium italic text-gray-400 hover:text-primary-500 dark:text-gray-500 dark:hover:text-primary-500"
                      >
                        View all {sortedTags.length}...
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
          <div>
            <ul>
              {displayPosts.map((post) => {
                const { path, date, title, images, summary, tags } = post
                return (
                  <li key={path} className="py-5">
                    <article className="flex flex-col space-y-2 xl:space-y-0">
                      <div className="py-0 pr-0">
                        <Image
                          alt={title}
                          src={images[0]}
                          className="object-cover object-center"
                          width={215}
                          height={150}
                        />
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link href={`/${path}`} className="text-gray-900 dark:text-gray-100">
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags?.map((tag) => <Tag key={tag} text={tag} />)}
                          </div>
                        </div>
                        <div className="prose max-w-none text-gray-500 dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                    </article>
                  </li>
                )
              })}
            </ul>
            {pagination && pagination.totalPages > 1 && (
              <Pagination currentPage={pagination.currentPage} totalPages={pagination.totalPages} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
