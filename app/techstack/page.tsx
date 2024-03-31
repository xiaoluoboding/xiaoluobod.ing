"use client"

import { Suspense } from "react"

import { HoverEffect } from "@/components/ui/CardHoverEffect"
import { FloatingHeader } from "@/components/FloadingHeader"
import { PageTitle } from "@/components/PageTitle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { useConstants } from "@/lib/useConstants"

export default function TechStackPage() {
  const { stackList } = useConstants()

  const title = "Tech Stack"
  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<LoadingSpinner />}>
            <p className="dark:text-secondary-foreground">
              Here is a list of my tech stack. I use these tools to build
              projects. I usually write <strong>React</strong> during the day
              while working and use <strong>Vue</strong> to write side projects
              at night.
            </p>
            <div className="max-w-5xl mx-auto px-2 lg:px-8 py-4 lg:py-16 z-10">
              {Object.keys(stackList).map((key) => {
                return (
                  <fieldset className="p-0 m-0 z-10" key={key}>
                    <figcaption className="p-0 m-0 text-lg font-semibold dark:text-accent-foreground">
                      {key}
                    </figcaption>
                    <figure className="p-0 m-0">
                      <HoverEffect
                        className="grid grid-cols-3 lg:grid-cols-4 py-4"
                        items={stackList[key as keyof typeof stackList]}
                      />
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
