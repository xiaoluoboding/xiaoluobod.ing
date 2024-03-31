"use client"

import { Suspense } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { PageTitle } from "@/components/PageTitle"
import { DockBar } from "@/components/DockBar"
import { cn } from "@/lib/utils"

export default function DockPage() {
  const pathname = usePathname()
  const isDockIndexPage = pathname === "/dock"
  const appList = [
    {
      name: "Launchpad",
      iconUrl: "/assets/launchpad.webp",
    },
    {
      name: "SpaceDrive",
      iconUrl: "/assets/spaced-drive.webp",
    },
    {
      name: "Arc",
      iconUrl: "/assets/arc.webp",
    },
    {
      name: "Chrome",
      iconUrl: "/assets/chrome.webp",
    },
    {
      name: "Spark",
      iconUrl: "/assets/spark.webp",
    },
    {
      name: "Spotify",
      iconUrl: "/assets/spotify.webp",
    },
    {
      name: "Notion",
      iconUrl: "/assets/notion.webp",
    },
    {
      name: "Telegram",
      iconUrl: "/assets/telegram.webp",
    },
    {
      name: "VSCode",
      iconUrl: "/assets/vscode.webp",
    },
    {
      name: "iTerm2",
      iconUrl: "/assets/iterm.webp",
    },
    {
      name: "GitHub Desktop",
      iconUrl: "/assets/github-desktop.webp",
    },
    {
      name: "Figma",
      iconUrl: "/assets/figma.webp",
    },

    {
      name: "Linear",
      iconUrl: "/assets/linear.webp",
    },
  ]
  return (
    <XScrollArea className="scrollable-area w-full">
      <FloatingHeader scrollTitle="Journey" />
      <div
        className={cn(
          "relative flex w-full flex-col items-center justify-center h-[calc(100vh-48px)] lg:h-screen"
        )}
      >
        <div className="flex flex-col items-center px-6 pb-20 md:px-20">
          <Image
            alt="Robert Shaw"
            src="/assets/me.png"
            width="150"
            height="150"
            decoding="async"
            className="rounded-full bg-transparent"
            loading="lazy"
          />
          <h1 className="mt-2 text-2xl text-white">Robert Shaw</h1>
          <div className="mt-3 flex max-w-2xl flex-col gap-1 text-center leading-normal text-gray-300">
            <p>Indie Hacker</p>
          </div>
          <div className="mt-2 flex gap-4">
            <a
              className="text-blue-400 hover:underline"
              href="http://github.com/xiaoluoboding"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <a
              className="text-blue-400 hover:underline"
              href="https://twitter.com/robert_shaw_x"
              target="_blank"
              rel="noreferrer"
            >
              Twitter
            </a>
          </div>
        </div>
        <Suspense fallback={<LoadingSpinner />}>
          <div className="absolute bottom-10 max-w-full px-4 lg:px-8">
            <DockBar apps={appList} />
          </div>
        </Suspense>
      </div>
    </XScrollArea>
  )
}

// export async function generateMetadata() {
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       url: siteUrl,
//     },
//     alternates: {
//       canonical: siteUrl,
//     },
//   }
// }
