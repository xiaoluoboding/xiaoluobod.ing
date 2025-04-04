"use client"
import { useEffect, useMemo, useState, useCallback } from "react"

import { fetchBookmarkList } from "@/app/actions/bookmark"
import { useBookmarkStore } from "@/store/bookmark"
import { BookmarkCard } from "./BookmarkCard/BookmarkCard"

export default function OssWorkList() {
  const [isClient, setIsClient] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const bookmarkStore = useBookmarkStore()
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)

  const handleInitialData = useCallback(async () => {
    const res = await fetchBookmarkList()
    bookmarkStore.setCollectionList(res.collectionList)
    bookmarkStore.setBookmarkList(res.bookmarkList)
  }, [bookmarkStore])

  const ossList = useMemo(() => {
    const ossLinkList = [
      "https://github.com/xiaoluoboding/vue-color-wheel",
      "https://github.com/xiaoluoboding/vue-sonner",
      "https://github.com/xiaoluoboding/vue-command-palette",
      "https://github.com/supa-kit/auth-ui-vue",
      "https://img2txt2audio.vercel.app/",
      "https://coolshapes-vue.vercel.app/",
    ]
    return bookmarkList
      .filter((bookmark) => ossLinkList.includes(bookmark.link))
      .map((item) => {
        const { origin } = new URL(item.link)
        return {
          ...item,
          domain: origin,
        }
      })
      .sort((a, b) => b.created_at!!.localeCompare(a.created_at!!))
  }, [bookmarkList])

  useEffect(() => {
    setIsClient(true)
    handleInitialData()
  }, [handleInitialData])
  return (
    <>
      {ossList.map((bookmark, index) => (
        <BookmarkCard key={index} bookmark={bookmark} order={index} tidy />
      ))}
    </>
  )
}
