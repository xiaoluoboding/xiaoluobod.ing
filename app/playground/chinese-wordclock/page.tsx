"use client"

import { Suspense } from "react"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import ChineseWordClock from "@/components/WordClock/ChineseWordClock"

export default function ChineseClockPage() {
  const title = "Chinese Word Clock"

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <Suspense fallback={<LoadingSpinner />}>
        <ChineseWordClock />
      </Suspense>
    </XScrollArea>
  )
}
