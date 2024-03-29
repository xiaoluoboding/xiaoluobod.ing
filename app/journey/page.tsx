import { Suspense } from "react"
import { PlusIcon } from "lucide-react"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { JourneyCard } from "@/components/JourneyCard/JourneyCard"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { PageTitle } from "@/components/PageTitle"

async function fetchData() {
  return {
    allLogbook: [
      {
        year: 2023,
        logs: [
          {
            title: "Indie Hacker",
            description:
              "As an indie hacker, I manage multiple small products with an Annual Recurring Revenue (ARR) exceeding $10,000. Moving forward, I aim to continue pushing for further growth.",
          },
        ],
      },
      {
        year: 2022,
        logs: [
          {
            title: "Married",
            description:
              "I have started a new life and got married. I have settled down in Dali, China.",
          },
        ],
      },
      {
        year: 2021,
        logs: [
          {
            title: "Remote work",
            description: "I left JD.com and started working remotely, WFH.",
          },
        ],
      },
      {
        year: 2017,
        logs: [
          {
            title: "Join JD.com",
            description:
              "I used Vue.js technology and found my first job as a frontend engineer.",
          },
        ],
      },
      {
        year: 2016,
        logs: [
          {
            title: "Ghost Blog",
            description:
              "I migrated my WordPress blog to Ghost and created my own theme for the Ghost blog: kaldorei.",
          },
        ],
      },
      {
        year: 2015,
        logs: [
          {
            title: "Learn Vue.js",
            description:
              "I self-taught front-end tech stack, including Vue.js.",
          },
        ],
      },
      {
        year: 2013,
        logs: [
          {
            title: "First Blog",
            description: "I create my first blog using WordPress.",
          },
        ],
      },
      {
        year: 1988,
        logs: [
          {
            title: "Born",
            description: "I was born in 1988. I was 36 years old.",
          },
        ],
      },
    ],
  }
}

export default async function Journey() {
  const { allLogbook } = await fetchData()

  return (
    <XScrollArea className="scrollable-area w-full">
      <FloatingHeader scrollTitle="Journey" />
      <div className="content-wrapper">
        <div className="content">
          <PageTitle title="Journey" />
          <Suspense fallback={<LoadingSpinner />}>
            <div className="flex flex-col items-stretch gap-12">
              {allLogbook.map((item, itemIndex) => (
                <div
                  key={`data_${itemIndex}`}
                  className="flex flex-col items-baseline gap-6 md:flex-row md:gap-12"
                >
                  <div className="flex items-center">
                    <h2>{item.year}</h2>
                    <hr className="my-0 ml-4 flex-1 border-dashed border-gray-200" />
                  </div>
                  <section>
                    {item.logs.map((log, logIndex) => (
                      <div
                        key={`data_${itemIndex}_log_${logIndex}`}
                        className="relative flex pb-8 last:pb-0"
                      >
                        {logIndex !== item.logs.length - 1 && (
                          <div className="absolute inset-0 flex w-6 items-center justify-center">
                            <div className="pointer-events-none h-full w-px border-l-[1px] border-gray-200"></div>
                          </div>
                        )}
                        <div className="z-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black align-middle text-white">
                          <PlusIcon size={16} />
                        </div>
                        <div className="flex-grow pl-8">
                          <JourneyCard {...log} index={logIndex} />
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
              ))}
            </div>
          </Suspense>
        </div>
      </div>
    </XScrollArea>
  )
}

// export async function generateMetadata() {
//   const seoData = await getPageSeo("journey")
//   if (!seoData) return null

//   const {
//     seo: { title, description },
//   } = seoData
//   const siteUrl = "/journey"

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
