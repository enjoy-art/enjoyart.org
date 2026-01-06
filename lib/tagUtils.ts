import { slug } from 'github-slugger'

export type TagCategory = 'artist' | 'movement' | 'location' | 'tag'

export interface ParsedTag {
  category: TagCategory
  value: string
  slug: string
  original: string
}

export const TAG_CATEGORIES: TagCategory[] = ['artist', 'movement', 'location', 'tag']

export const CATEGORY_PREFIXES: Record<string, TagCategory> = {
  'artist:': 'artist',
  'movement:': 'movement',
  'location:': 'location',
}

export const CATEGORY_ROUTES: Record<TagCategory, string> = {
  artist: '/artists',
  movement: '/movements',
  location: '/locations',
  tag: '/tags',
}

export const CATEGORY_LABELS: Record<TagCategory, string> = {
  artist: 'Artists',
  movement: 'Movements',
  location: 'Locations',
  tag: 'Tags',
}

/**
 * Parse a tag string into its category and value
 * e.g., "artist:Karl Bryullov" -> { category: 'artist', value: 'Karl Bryullov', slug: 'karl-bryullov' }
 * e.g., "Romanticism" -> { category: 'tag', value: 'Romanticism', slug: 'romanticism' }
 */
export function parseTag(tag: string): ParsedTag {
  for (const [prefix, category] of Object.entries(CATEGORY_PREFIXES)) {
    if (tag.toLowerCase().startsWith(prefix.toLowerCase())) {
      const value = tag.slice(prefix.length).trim()
      return {
        category,
        value,
        slug: slug(value),
        original: tag,
      }
    }
  }

  // No prefix - it's a generic tag
  return {
    category: 'tag',
    value: tag,
    slug: slug(tag),
    original: tag,
  }
}

/**
 * Get the URL for a tag based on its category
 */
export function getTagUrl(tag: string): string {
  const parsed = parseTag(tag)
  return `${CATEGORY_ROUTES[parsed.category]}/${parsed.slug}`
}

/**
 * Get the display value for a tag (without the category prefix)
 */
export function getTagDisplayValue(tag: string): string {
  return parseTag(tag).value
}

/**
 * Group an array of tags by their categories
 */
export function groupTagsByCategory(tags: string[]): Record<TagCategory, ParsedTag[]> {
  const grouped: Record<TagCategory, ParsedTag[]> = {
    artist: [],
    movement: [],
    location: [],
    tag: [],
  }

  for (const tag of tags) {
    const parsed = parseTag(tag)
    grouped[parsed.category].push(parsed)
  }

  return grouped
}

/**
 * Count tags by category from a tag count record
 */
export interface CategorizedTagCounts {
  artist: Record<string, number>
  movement: Record<string, number>
  location: Record<string, number>
  tag: Record<string, number>
}

export function categorizeTags(tagCounts: Record<string, number>): CategorizedTagCounts {
  const categorized: CategorizedTagCounts = {
    artist: {},
    movement: {},
    location: {},
    tag: {},
  }

  for (const [tag, count] of Object.entries(tagCounts)) {
    const parsed = parseTag(tag)
    categorized[parsed.category][parsed.slug] = count
  }

  return categorized
}
