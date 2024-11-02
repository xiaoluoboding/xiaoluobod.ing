import { cache } from "react"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { NextResponse } from "next/server"
import { Bookmark } from "./types"
import { groupBy, uniq } from "lodash-es"

export const isProd = process.env.NODE_ENV === "production"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const isExternalLink = (href: string) => {
  if (!href) return false
  return !href.startsWith("/") && !href.startsWith("#")
}

export const formatSlug = (str: string) => {
  return str.indexOf("&") !== -1
    ? str.toLowerCase().replace(/ /g, "").replace(/&/g, "-")
    : str.toLowerCase().replace(/ /g, "-").replace(/&/g, "-")
}

export const sortByProperty = cache((arr: any[], prop: any) => {
  return arr?.sort((a, b) => {
    const itemA = a[prop].toUpperCase()
    const itemB = b[prop].toUpperCase()

    if (itemA < itemB) {
      return -1
    } else if (itemA > itemB) {
      return 1
    }

    return 0
  })
})

export const tryCatchNextResponse = async <T>(
  fn: () => Promise<T>
): Promise<NextResponse<T> | Response> => {
  try {
    const res = await fn()
    if (res) {
      return NextResponse.json(res)
    } else {
      return new Response(null, {
        status: 204,
      })
    }
  } catch (error: any) {
    const FrontEndResponseErrorData: any = {
      error: error.data,
      xRequestId: error.headers?.["x-request-id"],
    }
    return NextResponse.json(FrontEndResponseErrorData, {
      status: error.status,
    })
  }
}

export const createCollectionList = (bookmarkList: Bookmark[]) => {
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
      slug: formatSlug(tag),
      count: counter,
    }
  })

  const sortedCollection = sortByProperty(collectionList, "title")
  return sortedCollection
}

// Helper function to get the base URL
export function getBaseUrl() {
  if (typeof window !== "undefined") {
    // Browser should use relative URL
    return ""
  }

  if (process.env.NEXT_PUBLIC_API_URL) {
    // Use custom environment variable if set
    return process.env.NEXT_PUBLIC_API_URL
  }

  // Use Vercel environment variables
  // Note: VERCEL_URL includes the path prefix (`https://your-domain.vercel.app`)
  // This handles preview deployments as well
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  }

  // Default to localhost in development
  return `http://localhost:${process.env.PORT || 5173}`
}
