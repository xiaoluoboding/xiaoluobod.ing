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
  }, [])
  return (
    <>
      {isClient && (
        <div className="flex w-full relative">
          <div className="absolute top-0 z-0 h-full w-full bg-white dark:bg-accent">
            <div className="absolute top-0 z-0 h-screen w-screen bg-white dark:bg-accent bg-[radial-gradient(100%_50%_at_50%_0%,rgba(120,119,198,0.3)_0,rgba(0,163,255,0)_50%,rgba(0,163,255,0)_100%)]" />
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
