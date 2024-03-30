import { Suspense } from "react"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { PageTitle } from "@/components/PageTitle"
import { Dock } from "@/components/Dock"

export default async function DockPage() {
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
      <div className="content-wrapper h-screen pb-12">
        <div className="content h-full flex flex-col justify-between max-w-screen-lg">
          <PageTitle title="Dock" className="text-white" />
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex flex-col h-full justify-end gap-12">
              <div></div>
              <Dock apps={appList} />
            </div>
          </Suspense>
        </div>
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
