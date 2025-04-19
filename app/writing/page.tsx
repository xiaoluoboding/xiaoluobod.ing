"use client"

import { Suspense, useState, useEffect } from "react"

import { FloatingHeader } from "@/components/FloadingHeader"
import { PageTitle } from "@/components/PageTitle"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { ClientTweetCard } from "@/components/TweetCard"
import { tweets, getAllCategories } from "@/lib/data/tweets"

export default function WritingPage() {
  const title = "Writing"
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const categories = getAllCategories()

  const filteredTweets = selectedCategory
    ? tweets.filter((tweet) => tweet.categories?.includes(selectedCategory))
    : tweets

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(selectedCategory === category ? null : category)
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title={title} />
          <Suspense fallback={<LoadingSpinner />}>
            <div className="max-w-5xl mx-auto px-2 py-4 lg:py-16 z-10">
              <div className="flex flex-col gap-6 md:justify-between mb-8">
                <h2 className="text-2xl font-semibold">My Tweets</h2>

                {/* Category filters */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                      selectedCategory === null
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted dark:bg-neutral-500/80 hover:bg-muted/80"
                    }`}
                    aria-pressed={selectedCategory === null}
                  >
                    All
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => handleCategoryClick(category)}
                      className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                        selectedCategory === category
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted dark:bg-neutral-500/80 hover:bg-muted/80"
                      }`}
                      aria-pressed={selectedCategory === category}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Waterfall layout */}
              <div
                className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8 auto-rows-min ${
                  isLoaded ? "opacity-100" : "opacity-0"
                } transition-opacity duration-500`}
              >
                {filteredTweets.map((tweet, index) => (
                  <div
                    key={tweet.id}
                    className={`transform transition-all duration-300 ease-out hover:scale-[1.02] ${
                      isLoaded
                        ? "translate-y-0 opacity-100"
                        : "translate-y-4 opacity-0"
                    }`}
                    style={{
                      transitionDelay: `${isLoaded ? index * 100 : 0}ms`,
                    }}
                  >
                    <div className="bg-neutral-50 dark:bg-neutral-900 shadow-md rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                      {tweet.title && (
                        <h3 className="font-medium text-lg mb-3">
                          {tweet.title}
                        </h3>
                      )}
                      <ClientTweetCard id={tweet.id} />
                      <div className="mt-3 flex items-center justify-between text-sm text-muted-foreground">
                        <time dateTime={tweet.date}>
                          {new Date(tweet.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </time>

                        {tweet.categories && (
                          <div className="flex gap-1">
                            {tweet.categories.map((cat) => (
                              <span
                                key={cat}
                                onClick={() => handleCategoryClick(cat)}
                                className="text-xs px-2 py-0.5 rounded-full bg-muted cursor-pointer hover:bg-muted/80"
                              >
                                {cat}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {filteredTweets.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  No tweets found for this category.
                </div>
              )}
            </div>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}
