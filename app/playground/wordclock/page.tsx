"use client"

import { Suspense } from "react"

import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"

import WordClock from "@/components/WordClock/WordClock"
export default function ToolsPage() {
  const title = "Word Clock inspired by QLOCKTWO®"

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <Suspense fallback={<LoadingSpinner />}>
        <WordClock />
      </Suspense>
    </XScrollArea>
  )
}
