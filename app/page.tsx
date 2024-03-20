// import Link from "next/link"
import { Suspense } from "react"

import { LoadingSpinner } from "@/components/LoadingSpinner"
// import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Home() {
  return (
    <ScrollArea className="relative flex flex-col w-full">
      {/* <FloatingHeader scrollTitle="Robert Shaw" /> */}
      <div className="content-wrapper">
        <div className="content space-y-2">
          {/* <PageTitle title="Home" className="lg:hidden" /> */}
          <h1>
            Hey there, 👋 I&apos;m Robert Shaw, a web dev enthusiast with a
            passion for Vue.js.
          </h1>
          <p></p>
          <p>
            🖖 Vue.js fan / 🍎 Swift Learner / ☕️ Coffee lover / 🌵 agave
            guardian
          </p>
          <p>
            Obsessed with bringing ideas to life through building. Explore all
            my projects.
          </p>
          <Suspense fallback={<LoadingSpinner />}>
            {/* <Button asChild variant="link" className="inline px-0">
              <Link href="/writing">
                <h2 className="mb-4 mt-8">Writing</h2>
              </Link>
            </Button> */}
            {/* <WritingList items={sortedPosts} header="Writing" /> */}
          </Suspense>
        </div>
      </div>
    </ScrollArea>
  )
}
