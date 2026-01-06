import Link from 'next/link'
import { getTagUrl, getTagDisplayValue } from '@/lib/tagUtils'

interface Props {
  text: string
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={getTagUrl(text)}
      className="mr-3 text-sm font-medium text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
    >
      {getTagDisplayValue(text)}
    </Link>
  )
}

export default Tag
