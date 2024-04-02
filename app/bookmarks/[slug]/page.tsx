/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { toast } from "sonner"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import { BookmarkCard } from "@/components/BookmarkCard/BookmarkCard"
import { Bookmark, Collection } from "@/lib/types"
import { XButton } from "@/components/ui/XButton"
import { useBookmarkStore } from "@/store/bookmark"
import {
  XDrawer,
  XDrawerContent,
  XDrawerHeader,
  XDrawerOverlay,
  XDrawerPortal,
} from "@/components/ui/XDrawer"
import { SquarePenIcon, XIcon } from "lucide-react"
import { UpdateBookmarkForm } from "../modules/UpdateBookmarkForm"
import { formatSlug, isProd } from "@/lib/utils"

// export async function generateStaticParams() {
//   return collectionList.map((collection: Collection) => ({
//     slug: collection.slug,
//   }))
// }

export default function CollectionPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false)
  const bookmarkStore = useBookmarkStore()
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)
  const collectionList = useBookmarkStore((state) => state.collectionList)
  const [currentCollection, setCurrentCollection] = useState<Collection | null>(
    null
  )
  const [currentBookmarkList, setCurrentBookmarkList] = useState<Bookmark[]>([])
  const [selectedBookmark, setSelectedBookmark] = useState<Bookmark>(
    {} as Bookmark
  )

  const handleInitialData = useCallback(async () => {
    const currentCollection = collectionList.find(
      (collection) => collection.slug === slug
    )
    currentCollection && setCurrentCollection(currentCollection)
    const list = bookmarkStore.isSearcing
      ? bookmarkList
      : bookmarkList.filter((bookmark) => {
          return bookmark.tags
            .map((item) => formatSlug(item.name))
            .includes(slug)
        })
    list && setCurrentBookmarkList(list)
  }, [
    slug,
    bookmarkStore.bookmarkList,
    bookmarkStore.isSearcing,
    collectionList,
  ])

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
    try {
      const res = await fetch(`/api/sdb/bookmark/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res) {
        toast.success("Bookmark deleted successfully")
        setIsLoading(false)
        handleInitialData()
      }
    } catch (error) {
      setIsLoading(false)
    } finally {
      bookmarkStore.setBookmarkState({
        isReRender: true,
      })
    }
  }

  const handleOpenDrawer = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark)
    setOpenUpdateDrawer(true)
  }

  useEffect(() => {
    handleInitialData()
  }, [
    slug,
    bookmarkStore.bookmarkList,
    bookmarkStore.isSearcing,
    collectionList,
  ])
  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [])

  return (
    <>
      {isClient && (
        <>
          <XScrollArea className="bg-grid scrollable-area">
            <FloatingHeader
              scrollTitle={currentCollection?.title}
              goBackLink="/bookmarks"
              bookmarks={collectionList}
              currentBookmark={currentCollection}
            />
            <div className="content-wrapper">
              <div className="content @container">
                <PageTitle title={currentCollection?.title || ""} />
                <Suspense fallback={<LoadingSpinner />}>
                  {/* <!-- Masnory Layout for Bookmark Card --> */}
                  <div className="columns-1 lg:columns-2 2xl:columns-2 lg:gap-6 [&>div:not(:first-child)]:mt-6">
                    {currentBookmarkList.map((bookmark, index) => {
                      const { origin } = new URL(bookmark.link)
                      // const urlInfo = parseUrl(origin)
                      const newBookmark: Bookmark = {
                        ...bookmark,
                        domain: origin,
                      }

                      return (
                        <div key={bookmark.link} className="relative">
                          <BookmarkCard bookmark={newBookmark} order={index} />
                          {!isProd && (
                            <>
                              <XButton
                                className="absolute bottom-2 right-12"
                                disabled={isLoading}
                                variant={"ghost"}
                                size="icon"
                                onClick={() => handleOpenDrawer(bookmark)}
                              >
                                <SquarePenIcon className="w-4 h-4" />
                              </XButton>
                              <XButton
                                className="absolute bottom-2 right-4"
                                disabled={isLoading}
                                variant={"ghost"}
                                size="icon"
                                onClick={() => handleDeleteCard(bookmark.id)}
                              >
                                <XIcon className="w-4 h-4" />
                              </XButton>
                            </>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </Suspense>
              </div>
            </div>
          </XScrollArea>
          <XDrawer
            shouldScaleBackground={false}
            open={openUpdateDrawer}
            onOpenChange={setOpenUpdateDrawer}
            direction="right"
          >
            <XDrawerPortal>
              <XDrawerOverlay className="fixed inset-0 bg-black/40" />
              <XDrawerContent className="fixed bottom-0 right-0 flex h-full w-2/5 flex-col rounded-l-lg bg-gray-100">
                <div className="flex-1 overflow-y-auto rounded-l-lg bg-background">
                  <XDrawerHeader className="font-semibold text-xl text-accent-foreground">
                    Update Bookmark
                  </XDrawerHeader>

                  <div className="p-4 gap-4">
                    <UpdateBookmarkForm
                      setDialogOpen={setOpenUpdateDrawer}
                      bookmark={selectedBookmark}
                    />
                  </div>
                </div>
              </XDrawerContent>
            </XDrawerPortal>
          </XDrawer>
        </>
      )}
    </>
  )
}

// export function generateMetadata({ params }: { params: { slug: string } }) {
//   const { slug } = params

//   const siteUrl = `/bookmarks/${slug}`
//   const seoTitle = `${slug.toLowerCase()} | Bookmarks`
//   const seoDescription = `A curated selection of various handpicked ${slug.toLowerCase()} bookmarks by Robert Shaw`

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
