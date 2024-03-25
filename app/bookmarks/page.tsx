import { Suspense } from "react"
import Link from "next/link"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { LoadingSpinner } from "@/components/LoadingSpinner"
// import { getBookmarks } from "@/lib/raindrop"
import { sortByProperty } from "@/lib/utils"
import { FloatingHeader } from "@/components/FloadingHeader"

async function fetchData() {
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
  return {
    bookmarks: sortByProperty(collectionList, "title"),
  }
}

export default async function Writing() {
  const { bookmarks } = await fetchData()

  return (
    <XScrollArea className="lg:hidden">
      <FloatingHeader title="Bookmarks" bookmarks={bookmarks} />
      <Suspense fallback={<LoadingSpinner />}>
        {bookmarks?.map((bookmark) => {
          return (
            <Link
              key={bookmark._id}
              href={`/bookmarks/${bookmark.slug}`}
              className="flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100"
            >
              <span className="font-medium">{bookmark.title}</span>
              <span className="text-slate-500">{bookmark.count} bookmarks</span>
            </Link>
          )
        })}
      </Suspense>
    </XScrollArea>
  )
}

// export async function generateMetadata() {
//   const seoData = await getPageSeo("bookmarks")
//   if (!seoData) return null

//   const {
//     seo: { title, description },
//   } = seoData
//   const siteUrl = "/bookmarks"

//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: siteUrl,
//     },
//     alternates: {
//       canonical: siteUrl,
//     },
//   }
// }
