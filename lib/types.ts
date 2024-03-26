export type BookmarkTag = {
  id: string
  name: string
  color: string
}

export interface Bookmark {
  id: string
  title: string
  link: string
  image: string
  description: string
  logo: string | null
  author: string | null
  publisher: string | null
  domain: string | null
  tag: BookmarkTag[]
}

export interface Collection {
  id: string
  title: string
  slug: string
  count: number
}
