"use client"

import { Suspense } from "react"

import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"

import HexClock from "@/components/HexClock/HexClock"

export default function HexClockPage() {
  const title = "Hex Clock - Time as Colors"

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <Suspense fallback={<LoadingSpinner />}>
        <HexClock />
      </Suspense>
    </XScrollArea>
  )
}
