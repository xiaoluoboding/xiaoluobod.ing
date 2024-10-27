/* eslint-disable @next/next/no-img-element */
"use client"

import { Suspense, useMemo } from "react"

import { FloatingHeader } from "@/components/FloadingHeader"
import { PageTitle } from "@/components/PageTitle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { toolList } from "@/lib/useConstants"
import { cn } from "@/lib/utils"
import { useBookmarkStore } from "@/store/bookmark"
import { Bookmark } from "@/lib/types"
import { isNumber } from "lodash-es"

export default function ToolsPage() {
  const title = "Tools"

  const bookmarkList = useBookmarkStore((state) => state.bookmarkList)

  const toolBookmarkList = useMemo<
    Record<
      string,
      Array<
        (typeof toolList)[keyof typeof toolList][number] & Partial<Bookmark>
      >
    >
  >(() => {
    const newToolList: Record<
      string,
      Array<
        (typeof toolList)[keyof typeof toolList][number] & Partial<Bookmark>
      >
    > = {}

    Object.entries(toolList).forEach(([category, list]) => {
      newToolList[category] = list.map((item) => {
        const bookmark = bookmarkList.find((bookmark) => {
          const { origin: bookmarkOrigin } = new URL(bookmark.link)
          const { origin: itemOrigin } = new URL(item.link)
          return bookmarkOrigin === itemOrigin
        })
        console.log(bookmark)
        return {
          ...bookmark,
          ...item,
        }
      })
    })

    return newToolList
  }, [bookmarkList])

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<LoadingSpinner />}>
            <p className="dark:text-secondary-foreground">
              Here is a list of tools I use to build projects.
            </p>
            <div className="max-w-5xl mx-auto py-4 lg:py-8 z-10 space-y-8">
              {Object.keys(toolBookmarkList).map((key) => {
                return (
                  <fieldset className="p-0 m-0 z-10" key={key}>
                    <figcaption className="p-0 m-0 text-lg font-semibold dark:text-accent-foreground">
                      {key}
                    </figcaption>
                    <figure className="p-0 m-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {toolBookmarkList[key as keyof typeof toolList].map(
                        (bookmark) => {
                          return (
                            <a
                              key={bookmark.link}
                              className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white dark:bg-accent p-4 transition-colors duration-300 hover:bg-sky-50/20 hover:dark:bg-background"
                              href={`${bookmark.link}?ref=robertshaw.id`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex flex-col gap-1.5">
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center gap-1">
                                    <img
                                      src={
                                        bookmark.logo || "/assets/fallback.webp"
                                      }
                                      className="inline-block align-text-bottom mr-1 h-5 w-5"
                                      alt={bookmark.author || ""}
                                    />
                                    <span
                                      className={cn(
                                        "text-lg leading-snug font-semibold text-accent-foreground line-clamp-2"
                                      )}
                                    >
                                      {bookmark.title}
                                    </span>
                                  </div>
                                  <span
                                    className={cn(
                                      "text-xs text-accent-foreground font-semibold",
                                      bookmark.price === "Free"
                                        ? "text-emerald-500"
                                        : "text-sky-500"
                                    )}
                                  >
                                    {isNumber(bookmark.price)
                                      ? `$${bookmark.price}/mo`
                                      : `${bookmark.price}`}
                                  </span>
                                </div>
                                <span
                                  className={cn(
                                    "text-sm text-accent-foreground line-clamp-3"
                                  )}
                                >
                                  {bookmark.description}
                                </span>
                              </div>
                            </a>
                          )
                        }
                      )}
                    </figure>
                  </fieldset>
                )
              })}
            </div>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}
