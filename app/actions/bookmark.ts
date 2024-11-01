"use server"

import { Bookmark } from "@/lib/types"
import { createCollectionList, getBaseUrl } from "@/lib/utils"

export async function fetchBookmarkList() {
  // Need to use absolute URL in server components
  const res = await fetch(`${getBaseUrl()}/api/sdb/bookmark`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // next: {
    //   revalidate: 60 * 5, // 10 minutes
    // },
  })
  const bookmarkList = (await res.json()) as Bookmark[]
  const collectionList = createCollectionList(bookmarkList)

  return {
    bookmarkList,
    collectionList,
  }
}
