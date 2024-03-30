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
        year: 2024,
        logs: [
          {
            title: "Migrate blog to Next",
            description:
              "Rewrite blog using `Next`, and deployed it on `Vercel`.",
          },
        ],
      },
      {
        year: 2023,
        logs: [
          {
            title: "Join AI Startup",
            description:
              "I joined an AI startup company dedicated to revolutionizing the e-commerce landscape through the power of Generative AI as the lead developer.",
          },
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
            title: "Join Bytebase",
            description:
              "I left JD.com and joined Bytebase. I started working remotely.",
          },
        ],
      },
      {
        year: 2020,
        logs: [
          {
            title: "Migrate blog to Nuxt",
            description:
              "Rewrite blog using `Nuxt`, and deployed it on `Netlify`.",
          },
        ],
      },
      {
        year: 2018,
        logs: [
          {
            title: "Migrate blog to Nuxt",
            description:
              "At JD.com, I have focused on data visualization and developed an open-source chart component library named [ve-charts](https://github.com/vueblocks/ve-charts)",
          },
        ],
      },
      {
        year: 2017,
        logs: [
          {
            title: "Join JD.com",
            description:
              "I self-taught front-end dev and found my first job in the field, marking the beginning of my career in web dev.",
          },
        ],
      },
      {
        year: 2016,
        logs: [
          {
            title: "Learn React.js",
            description:
              "Due to work requirements, I started learning React.js from scratch. Eventually, I successfully completed the project delivery.",
          },
          {
            title: "Migrate blog to Ghost",
            description:
              "Migrated my `WordPress` blog to `Ghost` and created my own theme for the Ghost blog: [Kaldorei](https://github.com/xiaoluoboding/ghost-theme-kaldorei).",
          },
        ],
      },
      {
        year: 2015,
        logs: [
          {
            title: "Learn Vue.js",
            description:
              "I self-taught front-end tech stack, including `Vue.js`.",
          },
        ],
      },
      {
        year: 2013,
        logs: [
          {
            title: "First Blog",
            description:
              "I create my first blog using `WordPress` and deploy it on `Linode`.",
          },
        ],
      },
      {
        year: 2011,
        logs: [
          {
            title: "Got First Backend Job",
            description:
              "I studied software engineering at university and now work as a backend development engineer, primarily using `C` language and `SQL`.",
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
