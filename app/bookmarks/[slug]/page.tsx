import { Suspense, useCallback, useMemo } from "react"
import { notFound } from "next/navigation"
import { cloneDeep } from "lodash-es"

import { cn, sortByProperty } from "@/lib/utils"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import { Bookmark } from "@/lib/types"

interface Collection {
  _id: string
  title: string
  slug: string
  count: number
}

const collectionList = [
  {
    _id: "1",
    title: "SaaS",
    slug: "saas",
    count: 0,
  },
  {
    _id: "2",
    title: "AI",
    slug: "ai",
    count: 0,
  },
]

export async function generateStaticParams() {
  return collectionList.map((collection: Collection) => ({
    slug: collection.slug,
  }))
}

async function fetchData(slug: string) {
  const currentCollection = collectionList.find(
    (collection) => collection.slug === slug
  )
  if (!currentCollection) notFound()

  const sortedCollection = sortByProperty(collectionList, "title")
  // const bookmarkItems = await getBookmarkItems(currentBookmark._id)
  // const bookmarkItems = [

  // ]

  return {
    collectionList: sortedCollection,
    currentCollection,
  }
}

const bookmarkList: Bookmark[] = [
  {
    link: "https://onetab.group",
    author: null,
    description:
      "onetab.group is a chrome extension that allows you to manage your tabs & tab groups in one place. One-click to aggregate all tabs & tab groups into one session.",
    image: "https://onetab.group/preview.jpg",
    logo: "https://www.onetab.group/logo.svg",
    publisher: null,
    title: "onetab.group: Your all-in-one tab manager for chrome.",
    domain: null,
  },
  {
    link: "https://sidespace.app",
    author: null,
    logo: "https://www.sidespace.app/favicon.svg",
    publisher: null,
    description:
      "Your Vertical Tabs Manager for Organizing Browser. Tabs It allows you to have more control over your web browsing experience by effectively managing multiple tabs at once.",
    image: "https://sidespace.app/preview.jpg",
    title:
      "Side Space | Your Vertical Tabs Manager for Organizing Browser Tabs",
    domain: null,
  },
  {
    link: "https://bookmark.style/",
    title: "bookmark.style: stylish your visual web bookmark",
    description:
      "🪄 Turn any link into a stylish visual web bookmark, one-click to copy the beautiful web bookmark image.",
    author: "",
    publisher: "",
    image: "https://bookmark.style/preview.png",
    logo: "https://bookmark.style/favicon.svg",
    domain: null,
  },
  {
    link: "https://github.com/one-tab-group/chrome-web-bookmark",
    author: "one-tab-group",
    description:
      "One-click turn any link into a visual web bookmark, and it looks Like Twitter cards or Notion web bookmark. - GitHub - one-tab-group/chrome-web-bookmark: One-click turn any link into a visual web b...",
    image:
      "https://opengraph.githubassets.com/605fbb412eff58955049a9011f1ef2e72ad345f1981937e2bc136bf6126ea1a1/one-tab-group/chrome-web-bookmark",
    logo: "https://github.com/fluidicon.png",
    publisher: "GitHub",
    title:
      "One-click turn any link into a visual web bookmark, and it looks Like Twitter cards or Notion web bookmark.",
    domain: null,
  },
  {
    link: "https://github.com/xiaoluoboding/vue-sonner",
    author: "xiaoluoboding",
    logo: "https://logo.clearbit.com/github.com",
    publisher: "GitHub",
    description: "🔔 An opinionated toast component for Vue.",
    image:
      "https://repository-images.githubusercontent.com/607054697/52a2e8ce-1178-4b81-87f3-a76fe8f5c290",
    title: "🔔 An opinionated toast component for Vue.",
    domain: null,
  },
  {
    link: "https://github.com/xiaoluoboding/vue-command-palette",
    author: "xiaoluoboding",
    logo: "https://logo.clearbit.com/github.com",
    publisher: "GitHub",
    description:
      "⌨️ A fast, composable, unstyled command palette interface for Vue.",
    image:
      "https://repository-images.githubusercontent.com/530924867/392a9c8e-1aaf-43ba-af9a-ca3765bbd9ac",
    title: "⌨️ A fast, composable, unstyled command palette interface for Vue.",
    domain: null,
  },
  {
    link: "https://github.com/xiaoluoboding/nuxt3-starter",
    author: "xiaoluoboding",
    description: "💚 A Better Nuxt 3 Starter Template，generate by nuxi.",
    image:
      "https://opengraph.githubassets.com/2ebab3a39812c0aa320cf3232e5439eeba7e91865ea9025dab952acded6c8d2a/xiaoluoboding/nuxt3-starter",
    logo: "https://github.com/fluidicon.png",
    publisher: "GitHub",
    title: "💚 A Better Nuxt 3 Starter Template，generate by nuxi.",
    domain: null,
  },
  {
    link: "https://github.com/nuxtbase/auth-ui-vue",
    author: "nuxtbase",
    logo: "https://logo.clearbit.com/github.com",
    publisher: "GitHub",
    description: "🔒 Pre-built Auth UI base on Supabase for Vue.",
    image:
      "https://repository-images.githubusercontent.com/672718739/237778ca-7e32-455c-8687-7f8b9ce8f66f",
    title: "🔒 Pre-built Auth UI base on Supabase for Vue",
    domain: null,
  },
]

export default async function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params
  const { collectionList, currentCollection } = await fetchData(slug)

  return (
    <XScrollArea className="bg-grid scrollable-area">
      <FloatingHeader
        scrollTitle={currentCollection.title}
        goBackLink="/bookmarks"
        bookmarks={collectionList}
        currentBookmark={currentCollection}
      />
      <div className="content-wrapper">
        <div className="content @container">
          <PageTitle title={currentCollection.title} />
          <Suspense fallback={<LoadingSpinner />}>
            {/* <!-- Masnory Layout for Bookmark Card --> */}
            <div className="columns-1 lg:columns-2 lg:gap-4 [&>a:not(:first-child)]:mt-4">
              {bookmarkList.map((bookmark, index) => {
                const { origin } = new URL(bookmark.link)
                // const urlInfo = parseUrl(origin)
                const newBookmark: Bookmark = {
                  ...bookmark,
                  domain: origin,
                }

                return (
                  <BookmarkCard
                    key={bookmark.link}
                    bookmark={newBookmark}
                    order={index}
                  />
                )
              })}
            </div>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}

// export async function generateMetadata({ params }) {
//   const { slug } = params
//   const bookmarks = await getBookmarks()
//   const currentBookmark = bookmarks.find((bookmark) => bookmark.slug === slug)
//   if (!currentBookmark) return null

//   const siteUrl = `/bookmarks/${currentBookmark.slug}`
//   const seoTitle = `${currentBookmark.title} | Bookmarks`
//   const seoDescription = `A curated selection of various handpicked ${currentBookmark.title.toLowerCase()} bookmarks by Onur Şuyalçınkaya`

//   return {
//     title: seoTitle,
//     description: seoDescription,
//     openGraph: {
//       title: seoTitle,
//       description: seoDescription,
//       url: siteUrl,
//     },
//     alternates: {
//       canonical: siteUrl,
//     },
//   }
// }
