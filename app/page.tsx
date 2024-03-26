// import Link from "next/link"
import { Suspense } from "react"

import { LoadingSpinner } from "@/components/LoadingSpinner"
// import { XButton } from "@/components/ui/XButton"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"

export default function Home() {
  return (
    <XScrollArea className="relative flex flex-col w-full scrollable-area">
      <FloatingHeader scrollTitle="Robert Shaw" />
      <div className="content-wrapper">
        <div className="content space-y-2">
          <PageTitle title="Home" className="lg:hidden" />
          <h1>Hey there, 👋 I&apos;m Robert Shaw</h1>
          <br />
          <p>A web dev enthusiast with a passion for Vue.js.</p>
          <p>
            🖖 Vue.js fan / 🍎 Swift Learner / ☕️ Coffee lover / 🌵 agave
            guardian
          </p>
          <p>
            Obsessed with bringing ideas to life through building. Explore all
            my projects.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            {/* <XButton asChild variant="link" className="inline px-0">
              <Link href="/writing">
                <h2 className="mb-4 mt-8">Writing</h2>
              </Link>
            </XButton> */}
            {/* <WritingList items={sortedPosts} header="Writing" /> */}
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}
