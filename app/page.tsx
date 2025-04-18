"use client"

import { Suspense, useEffect, useState } from "react"

import Image from "next/image"
import Link from "next/link"

// components
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { PageTitle } from "@/components/PageTitle"
import { FloatingHeader } from "@/components/FloadingHeader"
import OssWorkList from "@/components/OssWorkList"

// lib
import { PROFILES } from "@/lib/useConstants"
import { cn } from "@/lib/utils"

export default function Home() {
  const [isClient, setIsClient] = useState(false)
  const productList = [
    {
      title: "Side Space",
      description: "Your AI-powered vertical tabs manager for browsing",
      image: "/assets/side-space.svg",
      url: "https://sidespace.app?ref=robertshaw.id",
    },
    {
      title: "Tab Deck",
      description: "Your all-in-one browser tab/tab group manager",
      image: "/assets/one-tab-group.svg",
      url: "https://tabdeck.so?ref=robertshaw.id",
    },
    {
      title: "Bookmark Style",
      description: "Turn any link into a stylish visual web bookmark",
      image: "/assets/bookmark-style.svg",
      url: "https://bookmark.style?ref=robertshaw.id",
    },
    {
      title: "Stunning UI",
      description: "Create Stunning Websites That Stand Out",
      image: "/assets/stunning-ui.svg",
      url: "https://stunningui.design?ref=robertshaw.id",
    },
    {
      title: "UltraShot",
      description:
        "Image to text to Image, reimagine, ultra-fast, high-quality.",
      image: "/assets/ultrashot.svg",
      url: "https://ultrashot.pics?ref=robertshaw.id",
    },
    {
      title: "Repo Gallery",
      description:
        "Explore the Variety of Information in Open Source Repositories",
      image: "/assets/repo-gallery.svg",
      url: "https://repo-gallery.vercel.app/?ref=robertshaw.id",
    },
  ]

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <>
      {isClient && (
        <XScrollArea className="relative flex flex-col w-full scrollable-area">
          <FloatingHeader scrollTitle="Robert Shaw" />
          <div className="content-wrapper">
            <div className="content text-primary max-w-screen-lg">
              <PageTitle title="Home" className="lg:hidden" />
              <h1>Hey there, 👋 I&apos;m Robert Shaw</h1>
              <br />
              <section className="flex flex-col">
                <p className="my-0">
                  A Self-thought Front-end Product Engineer, Indie Maker/hacker.
                </p>
                <p className="my-0">
                  🖖 Vue.js fan / ☕️ Coffee lover / 🌵 Agave guardian / ✨
                  AI/AIGC enthusiast
                </p>
                <p className="my-0">
                  Passionate about bringing ideas to life. Explore all of my
                  projects.
                </p>
              </section>
              <Suspense fallback={<LoadingSpinner />}>
                <main className="mt-24 space-y-16">
                  <section>
                    <h2>Currently working on</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-8">
                      {productList.map((product) => (
                        <a
                          key={product.title}
                          href={product.url}
                          target="_blank"
                          className="flex flex-col items-start justify-between bg-neutral-100 dark:bg-neutral-800 rounded-2xl p-4 aspect-square transform-cpu transition-all hover:scale-105"
                        >
                          <Image
                            src={product.image}
                            alt={product.title}
                            width={80}
                            height={80}
                            className="bg-transparent border-none"
                          />
                          <div>
                            <h1 className="text-2xl font-semibold bg-gradient-to-b from-neutral-900 to-neutral-500 dark:from-white dark:to-neutral-300 text-transparent bg-clip-text">
                              {product.title}
                            </h1>
                            <div className="text-lg text-accent-foreground">
                              {product.description}
                            </div>
                          </div>
                        </a>
                      ))}
                    </div>
                  </section>
                  <section>
                    <h2>OSS Works</h2>
                    <div className="columns-1 lg:columns-2 2xl:columns-2 lg:gap-6 [&>a:not(:first-child)]:mt-6 mt-8">
                      <OssWorkList />
                    </div>
                  </section>
                  <section>
                    <h2>Find me on</h2>
                    <p className="flex flex-wrap gap-2 mt-4">
                      {Object.values(PROFILES).map((link, linkIndex) => {
                        return (
                          <Link
                            key={link.url}
                            href={link.url}
                            className={cn(
                              "group flex items-center justify-between rounded-lg p-2 text-accent-foreground hover:underline"
                            )}
                          >
                            <span className="flex items-center gap-2">
                              {link.icon}
                              <span className={cn("font-medium")}>
                                {link.title}
                              </span>
                            </span>
                          </Link>
                        )
                      })}
                    </p>
                  </section>
                </main>
              </Suspense>
            </div>
          </div>
        </XScrollArea>
      )}
    </>
  )
}
