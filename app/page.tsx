import { Suspense } from "react"

import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import Image from "next/image"

export default function Home() {
  return (
    <XScrollArea className="relative flex flex-col w-full scrollable-area">
      <FloatingHeader scrollTitle="Robert Shaw" />
      <div className="content-wrapper">
        <div className="content text-primary max-w-screen-lg">
          <PageTitle title="Home" className="lg:hidden" />
          <h1>Hey there, 👋 I&apos;m Robert Shaw</h1>
          <br />
          <section className="flex flex-col">
            <p className="my-0">
              A web dev enthusiast with a passion for Vue.js.
            </p>
            <p className="my-0">
              🖖 Vue.js fan / 🍎 SwiftUI Learner / ☕️ Coffee lover / 🌵 Agave
              guardian
            </p>
            <p className="my-0">
              Passionate about bringing ideas to life. Explore all of my
              projects.
            </p>
          </section>
          <Suspense fallback={<LoadingSpinner />}>
            <main className="mt-24">
              <h2>My products</h2>
              <section className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                <a
                  href="https://sidespace.app?ref=xiaoluobod.ing"
                  target="_blank"
                  className="flex flex-col items-start justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 aspect-square transform-cpu transition-all hover:scale-105"
                >
                  <Image
                    src="/assets/side-space.svg"
                    alt="Side Space"
                    width={80}
                    height={80}
                    className="bg-transparent border-none"
                  />
                  <div>
                    <h1 className="text-2xl font-semibold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                      Side Space
                    </h1>
                    <div className="text-lg text-accent-foreground">
                      AI-Powered browser tab group manager
                    </div>
                  </div>
                </a>
                <a
                  href="https://onetab.group?ref=xiaoluobod.ing"
                  target="_blank"
                  className="flex flex-col items-start justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 aspect-square transform-cpu transition-all hover:scale-105"
                >
                  <Image
                    src="/assets/one-tab-group.svg"
                    alt="One Tab Group"
                    width={80}
                    height={80}
                    className="bg-transparent border-none"
                  />
                  <div>
                    <h1 className="text-2xl font-semibold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                      One Tab Group
                    </h1>
                    <div className="text-lg text-secondary-foreground">
                      Your all-in-one browser tab manager
                    </div>
                  </div>
                </a>
                <a
                  href="https://bookmark.style?ref=xiaoluobod.ing"
                  target="_blank"
                  className="flex flex-col items-start justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 aspect-square transform-cpu transition-all hover:scale-105"
                >
                  <Image
                    src="/assets/bookmark-style.svg"
                    alt="Side Space"
                    width={80}
                    height={80}
                    className="bg-transparent border-none"
                  />
                  <div>
                    <h1 className="text-2xl font-semibold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-300  text-transparent bg-clip-text">
                      Bookmark Style
                    </h1>
                    <div className="text-lg text-secondary-foreground">
                      🪄 Turn any link into a stylish visual web bookmark
                    </div>
                  </div>
                </a>
              </section>
            </main>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}
