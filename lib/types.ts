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
  tags: BookmarkTag[]
  created_at?: string
  updated_at?: string
}

export interface Collection {
  id: string
  title: string
  slug: string
  count: number
}
