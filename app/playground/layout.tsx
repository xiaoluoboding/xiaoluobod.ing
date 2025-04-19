"use client"

import { Suspense, useEffect, useState } from "react"
import { SideMenu } from "@/components/SideMenu"
import { ListItem } from "@/components/ListItem"
import { LoadingSpinner } from "@/components/LoadingSpinner"

export default function ToolsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {isClient && (
        <div className="flex w-full relative">
          <div className="absolute top-0 z-0 h-full w-full bg-white dark:bg-neutral-900"></div>
          <SideMenu title="Playground" isInner>
            <Suspense fallback={<LoadingSpinner />}>
              <div className="flex flex-col gap-1 text-sm">
                <ListItem
                  key="wordclock"
                  path="/playground/wordclock"
                  title="Word Clock"
                  description="Word Clock inspired by QLOCKTWO®"
                />
                <ListItem
                  key="chinese-wordclock"
                  path="/playground/chinese-wordclock"
                  title="Chinese Word Clock"
                  description="Chinese Word Clock inspired by QLOCKTWO®"
                />
              </div>
            </Suspense>
          </SideMenu>
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
