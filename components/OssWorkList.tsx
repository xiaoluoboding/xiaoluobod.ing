"use client"
import { useEffect, useMemo } from "react"

import { fetchBookmarkList } from "@/app/actions/bookmark"
import { useBookmarkStore } from "@/store/bookmark"
import { BookmarkCard } from "./BookmarkCard/BookmarkCard"

const OssWorkList = () => {
  const bookmarkStore = useBookmarkStore()
  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)

  const handleInitialData = async () => {
    const res = await fetchBookmarkList()
    bookmarkStore.setCollectionList(res.collectionList)
    bookmarkStore.setBookmarkList(res.bookmarkList)
  }

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
    handleInitialData()
  }, [])
  return (
    <>
      {ossList.map((bookmark, index) => (
        <BookmarkCard key={index} bookmark={bookmark} order={index} tidy />
      ))}
    </>
  )
}

export default OssWorkList
