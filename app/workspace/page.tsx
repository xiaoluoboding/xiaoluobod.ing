"use client"

import { Suspense } from "react"

import { FloatingHeader } from "@/components/FloadingHeader"
import { PageTitle } from "@/components/PageTitle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"

export default function WorkspacePage() {
  const title = "Workspace"
  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<LoadingSpinner />}>
            <p>Working in progress.</p>
            <div className="max-w-5xl mx-auto px-2 lg:px-8 py-4 lg:py-16 z-10"></div>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}
