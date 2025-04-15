"use client"

import { useEffect, useState } from "react"

import { fetchBookmarkList } from "@/app/actions/bookmark"
import { useBookmarkStore } from "@/store/bookmark"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  const bookmarkStore = useBookmarkStore()
  const handleInitialData = async () => {
    const res = await fetchBookmarkList()
    bookmarkStore.setCollectionList(res.collectionList)
    bookmarkStore.setBookmarkList(res.bookmarkList)
  }

  useEffect(() => {
    handleInitialData()
  }, [])

  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [handleInitialData])
  return (
    <>
      {isClient && (
        <div className="flex w-full relative">
          <div className="absolute top-0 z-0 h-full w-full bg-white dark:bg-neutral-900">
            <section className="gridient-bg absolute inset-0 z-0 h-screen w-screen">
              <div className="polygon g-polygon-1 bg-gradient-to-br from-sky-500/60 to-sky-800/60"></div>
              <div className="polygon g-polygon-2 bg-gradient-to-br from-violet-300/60 via-violet-500/60 to-violet-800/60"></div>
              <div className="polygon g-polygon-3 bg-blue-500/60"></div>
            </section>
          </div>
          <div></div>
          <div className="flex-1">{children}</div>
        </div>
      )}
    </>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
