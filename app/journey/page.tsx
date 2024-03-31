import { Suspense } from "react"
import { PlusIcon } from "lucide-react"

import { XScrollArea } from "@/components/ui/XScrollArea"
import { JourneyCard } from "@/components/JourneyCard/JourneyCard"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { PageTitle } from "@/components/PageTitle"
import { useConstants } from "@/lib/useConstants"

export default async function Journey() {
  const { allLogbook } = await useConstants()

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
                        <div className="z-0 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-black dark:bg-white align-middle text-white dark:text-black">
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
