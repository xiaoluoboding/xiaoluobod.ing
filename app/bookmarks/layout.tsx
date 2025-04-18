"use client"

import { Suspense, cache, useEffect, useState } from "react"
import { cloneDeep, isEmpty } from "lodash-es"
import Fuse from "fuse.js"
import { useDebounceCallback } from "usehooks-ts"

import { SideMenu } from "@/components/SideMenu"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ListItem } from "@/components/ListItem"
import { formatSlug } from "@/lib/utils"
import { useBookmarkStore } from "@/store/bookmark"
import { XInput } from "@/components/ui/XInput"
import { useRouter } from "next/navigation"
import { SearchIcon } from "lucide-react"
import { fetchBookmarkList } from "@/app/actions/bookmark"

const fuseOptions = {
  threshold: 0.2,
  keys: ["title", "link", "description"],
}

export default function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [searchText, setSearchText] = useState("")
  const bookmarkStore = useBookmarkStore()
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const collectionList = useBookmarkStore((state) => state.collectionList)
  const [cloneCollectionList, setCloneCollectionList] = useState(
    cloneDeep(collectionList)
  )
  const [cloneBookmarkList, setCloneBookmarkList] = useState(
    cloneDeep(bookmarkList)
  )

  const fuse = cache(() => {
    const fuseIndex = Fuse.createIndex(fuseOptions.keys, bookmarkList)
    return new Fuse(bookmarkList, fuseOptions, fuseIndex)
  })

  const handleInitialData = async () => {
    const res = await fetchBookmarkList()
    bookmarkStore.setCollectionList(res.collectionList)
    bookmarkStore.setBookmarkList(res.bookmarkList)
    setCloneCollectionList(cloneDeep(res.collectionList))
    setCloneBookmarkList(cloneDeep(res.bookmarkList))
  }

  const handleFilterList = useDebounceCallback((text: string) => {
    if (!isEmpty(text)) {
      bookmarkStore.setBookmarkState({
        isSearching: true,
      })
      const bookmarkList = fuse()
        .search(text)
        .sort((a, b) => a.refIndex - b.refIndex)
        .map((b) => b.item)
      const collectionList = [
        {
          id: text.toUpperCase(),
          title: text,
          slug: formatSlug(text),
          count: bookmarkList.length,
        },
      ]
      router.push(`/bookmarks/${encodeURIComponent(formatSlug(text))}`)
      bookmarkStore.setCollectionList(collectionList)
      bookmarkStore.setBookmarkList(bookmarkList)
    } else {
      bookmarkStore.setBookmarkState({
        isSearching: false,
      })
      router.push(`/bookmarks/ai`)
      bookmarkStore.setCollectionList(cloneCollectionList)
      bookmarkStore.setBookmarkList(cloneBookmarkList)
    }
  }, 222)

  useEffect(() => {
    if (bookmarkStore.isReRender) {
      bookmarkStore.setBookmarkState({
        isReRender: false,
      })
      handleInitialData()
    }
  }, [bookmarkStore.isReRender, bookmarkStore, handleInitialData])

  useEffect(() => {
    setIsClient(true)
    handleInitialData()
    requestAnimationFrame(() => {
      router.push(`/bookmarks/ai`)
    })
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
                <div className="w-full py-2 pb-3">
                  <XInput
                    size={"sm"}
                    placeholder="Search by title, description, link..."
                    prefix={<SearchIcon className="w-4 h-4" />}
                    value={searchText}
                    onChange={(e) => {
                      e.preventDefault()
                      const text = e.target.value
                      setSearchText(text)
                      handleFilterList(text)
                    }}
                  />
                </div>
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
          <div className="lg:bg-grid flex-1 relative">{children}</div>
        </div>
      )}
    </>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
