"use client"

import { Suspense, useEffect, useState } from "react"
import Link from "next/link"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { FloatingHeader } from "@/components/FloadingHeader"
import { useBookmarkStore } from "@/store/bookmark"

export default function BookmarkPage() {
  const bookmarkStore = useBookmarkStore()
  const collectionList = useBookmarkStore((state) => state.collectionList)
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)

  return (
    <XScrollArea className="lg:hidden">
      <FloatingHeader title="Bookmarks" bookmarks={bookmarkList} />
      <Suspense fallback={<LoadingSpinner />}>
        {collectionList?.map((collection) => {
          return (
            <Link
              key={collection.id}
              href={`/bookmarks/${collection.slug}`}
              className="flex flex-col gap-1 border-b px-4 py-3 text-sm hover:bg-gray-100"
            >
              <span className="font-medium">{collection.title}</span>
              <span className="text-slate-500">
                {collection.count} bookmarks
              </span>
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
