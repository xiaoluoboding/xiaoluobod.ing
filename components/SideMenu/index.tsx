"use client"

import { useRouter, usePathname } from "next/navigation"
import { RadioIcon } from "lucide-react"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { useKeyPress } from "@/hooks/useKeyPress"
import { cn } from "@/lib/utils"
import { XButton } from "@/components/ui/XButton"

const keyCodePathnameMapping: Record<string, string> = {
  Digit1: "/",
  Digit2: "/writing",
  Digit3: "/journey",
  Digit4: "/stack",
  Digit5: "/workspace",
  Digit6: "/bookmarks",
}

interface IProps {
  className?: string
  children: React.ReactNode
  title?: string
  bookmarks?: any[]
  isInner?: boolean
}

export const SideMenu = ({
  className = "",
  children,
  title,
  bookmarks = [],
  isInner,
}: IProps) => {
  const router = useRouter()
  const pathname = usePathname()
  useKeyPress(onKeyPress, Object.keys(keyCodePathnameMapping))

  function onKeyPress(event: KeyboardEvent) {
    const key = event.code
    const targetPathname = keyCodePathnameMapping[key]
    if (targetPathname && targetPathname !== pathname)
      router.push(targetPathname)
  }

  const isWritingPath = pathname.startsWith("/writing")
  const isBookmarksPath = pathname.startsWith("/bookmarks")
  const currentBookmark = bookmarks.find(
    (bookmark) => `/bookmarks/${bookmark.slug}` === pathname
  )

  return (
    <XScrollArea
      className={cn(
        "hidden bg-neutral-50 lg:flex lg:flex-col lg:border-r",
        isInner ? "lg:w-80 xl:w-96" : "lg:w-60 xl:w-72",
        className
      )}
    >
      {title && (
        <div className="sticky top-0 z-10 border-b bg-neutral-50 px-5 py-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold tracking-tight">
              {title}
            </span>
            <div className="flex items-center gap-2">
              {(isWritingPath || isBookmarksPath) && (
                <XButton variant="outline" size="sm" asChild>
                  <a
                    href={isWritingPath ? "/writing.xml" : "/bookmarks.xml"}
                    title="RSS feed"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <RadioIcon size={16} className="mr-2" />
                    RSS feed
                  </a>
                </XButton>
              )}
            </div>
          </div>
        </div>
      )}
      <div className="bg-neutral-50 p-3">{children}</div>
    </XScrollArea>
  )
}
