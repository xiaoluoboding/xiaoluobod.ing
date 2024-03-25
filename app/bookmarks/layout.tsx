import { Suspense } from "react"

import { SideMenu } from "@/components/SideMenu"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { ListItem } from "@/components/ListItem"
// import { getBookmarks } from "@/lib/raindrop"
import { sortByProperty } from "@/lib/utils"

// Revalidate all routes every 2 days
export const revalidate = 60 * 60 * 24 * 2 // 2 days

async function fetchData() {
  const bookmarks = [
    {
      _id: "1",
      title: "SaaS",
      slug: "saas",
      count: 0,
    },
    {
      _id: "2",
      title: "AI",
      slug: "ai",
      count: 0,
    },
  ]
  return {
    bookmarks: sortByProperty(bookmarks, "title"),
  }
}

export default async function BookmarksLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { bookmarks } = await fetchData()

  return (
    <div className="flex w-full">
      <SideMenu title="Bookmarks" bookmarks={bookmarks} isInner>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="flex flex-col gap-1 text-sm">
            {bookmarks?.map((bookmark) => {
              return (
                <ListItem
                  key={bookmark._id}
                  path={`/bookmarks/${bookmark.slug}`}
                  title={bookmark.title}
                  description={`${bookmark.count} bookmarks`}
                />
              )
            })}
          </div>
        </Suspense>
      </SideMenu>
      <div className="lg:bg-grid flex-1">{children}</div>
    </div>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
