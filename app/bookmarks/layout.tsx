"use client"

import { Suspense, useEffect, useState } from "react"

import { SideMenu } from "@/components/SideMenu"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ListItem } from "@/components/ListItem"
import { sortByProperty } from "@/lib/utils"

import { groupBy, uniq } from "lodash-es"
import { Bookmark } from "@/lib/types"
import { useBookmarkStore } from "@/store/bookmark"

// Revalidate all routes every 2 days
export const revalidate = 60 * 60 * 24 * 2 // 2 days

async function fetchData() {
  const res = await fetch("/api/sdb/bookmark", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  const bookmarkList = (await res.json()) as Bookmark[]

  const groupedBookmarkList = groupBy(bookmarkList, (item) => {
    return item.tags.map((tag) => tag.name)
  })

  const tagList = bookmarkList.map((item) => {
    return item.tags.map((tag) => tag.name)
  })
  const uniqTagList = uniq(tagList.flat(1))

  const collectionList = uniqTagList.map((tag) => {
    let counter = 0

    for (const group in groupedBookmarkList) {
      if (group.includes(tag)) {
        counter += groupedBookmarkList[group].length
      }
    }

    return {
      id: tag.toUpperCase(),
      title: tag,
      slug: tag.toLowerCase().replace(/ /g, "-"),
      count: counter,
    }
  })

  const sortedCollection = sortByProperty(collectionList, "title")
  return {
    bookmarkList,
    collectionList: sortedCollection,
  }
}

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)
  const bookmarkStore = useBookmarkStore()
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const collectionList = useBookmarkStore((state) => state.collectionList)

  const handleInitialData = async () => {
    const res = await fetchData()
    bookmarkStore.setCollectionList(res.collectionList)
    bookmarkStore.setBookmarkList(res.bookmarkList)
  }

  useEffect(() => {
    if (bookmarkStore.isReRender) {
      bookmarkStore.setBookmarkState({
        isReRender: false,
      })
      handleInitialData()
    }
  }, [bookmarkStore.isReRender])

  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [])
  return (
    <>
      {isClient && (
        <div className="flex w-full">
          <SideMenu
            title={`Bookmarks (${bookmarkList.length})`}
            bookmarks={collectionList}
            isInner
          >
            <Suspense fallback={<LoadingSpinner />}>
              <div className="flex flex-col gap-1 text-sm">
                {collectionList?.map((collection) => {
                  return (
                    <ListItem
                      key={collection.id}
                      path={`/bookmarks/${collection.slug}`}
                      title={collection.title}
                      description={`${collection.count} bookmarks`}
                    />
                  )
                })}
              </div>
            </Suspense>
          </SideMenu>
          <div className="lg:bg-grid flex-1">{children}</div>
        </div>
      )}
    </>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
