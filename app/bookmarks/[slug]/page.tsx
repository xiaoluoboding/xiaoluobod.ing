"use client"

import { Suspense, useCallback, useEffect, useMemo, useState } from "react"
import { notFound } from "next/navigation"
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
  XDrawerTrigger,
} from "@/components/ui/XDrawer"
import { CommandIcon } from "lucide-react"
import { XInput } from "@/components/ui/XInput"
import { XTextarea } from "@/components/ui/XTextarea"

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
    const list = bookmarkList.filter((bookmark) => {
      return bookmark.tag
        .map((item) => item.name.toLowerCase().replace(/ /g, "-"))
        .includes(slug)
    })
    list && setCurrentBookmarkList(list)
  }, [slug])

  const handleDeleteCard = async (id: string) => {
    setIsLoading(true)
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
  }

  const handleOpenDrawer = (bookmark: Bookmark) => {
    setSelectedBookmark(bookmark)
    setOpenUpdateDrawer(true)
  }

  const handleUpdateBookmarkByLink = async (link: string) => {
    setIsLoading(true)
    const res = await fetch(`https://metafy.vercel.app/api?url=${link}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    const data = (await res.json()) as Partial<Bookmark>
    const newBookmark = {
      ...selectedBookmark,
      ...data,
    }
    const result = await fetch(`/api/sdb/bookmark/${selectedBookmark.id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBookmark),
    })
    if (result) {
      toast.success("Bookmark updated successfully")
      setIsLoading(false)
    }
  }

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
                  <div className="columns-1 lg:columns-2 2xl:columns-3 lg:gap-6 [&>div:not(:first-child)]:mt-6">
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
                          <XButton
                            className="absolute bottom-16 right-4"
                            disabled={isLoading}
                            onClick={() => handleOpenDrawer(bookmark)}
                          >
                            Update
                          </XButton>
                          <XButton
                            className="absolute bottom-4 right-4"
                            disabled={isLoading}
                            onClick={() => handleDeleteCard(bookmark.id)}
                          >
                            Delete
                          </XButton>
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
            <XButton variant="ghost" size="icon" title="Toggle drawer" asChild>
              <XDrawerTrigger>
                <CommandIcon size={16} />
              </XDrawerTrigger>
            </XButton>
            <XDrawerPortal>
              <XDrawerOverlay className="fixed inset-0 bg-black/40" />
              <XDrawerContent className="fixed bottom-0 right-0 flex h-full w-2/5 flex-col rounded-l-lg bg-gray-100">
                <div className="flex-1 overflow-y-auto rounded-l-lg bg-white">
                  <XDrawerHeader className="font-semibold">
                    Update Bookmark
                  </XDrawerHeader>
                  <div className="p-4 flex flex-col gap-4">
                    <fieldset className="space-y-1">
                      <label htmlFor="title" className="text-sm font-semibold">
                        Title
                      </label>
                      <XInput value={selectedBookmark.title} />
                    </fieldset>
                    <fieldset className="space-y-1">
                      <label htmlFor="link" className="text-sm font-semibold">
                        Link
                      </label>
                      <XInput value={selectedBookmark.link} />
                    </fieldset>
                    <fieldset className="space-y-1">
                      <label
                        htmlFor="description"
                        className="text-sm font-semibold"
                      >
                        Description
                      </label>
                      <XTextarea
                        className="h-32"
                        value={selectedBookmark.description}
                      />
                    </fieldset>
                    <XButton
                      className="mt-8"
                      disabled={isLoading}
                      onClick={(e) => {
                        e.preventDefault()
                        handleUpdateBookmarkByLink(selectedBookmark.link)
                      }}
                    >
                      Update
                    </XButton>
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
