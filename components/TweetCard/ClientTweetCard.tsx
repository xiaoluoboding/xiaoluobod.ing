"use client"

import { TweetProps, useTweet } from "react-tweet"
import { cn } from "@/lib/utils"
import { MagicTweet, TweetNotFound, TweetSkeleton } from "./TweetCard"

export const ClientTweetCard = ({
  id,
  apiUrl,
  fallback = <TweetSkeleton />,
  onError,
  ...props
}: TweetProps & { className?: string }) => {
  const { data, error, isLoading } = useTweet(id, apiUrl)

  if (isLoading) return fallback
  if (error || !data) {
    return <TweetNotFound error={onError ? onError(error) : error} />
  }

  return (
    <div
      className={cn(
        "thumbnail-shadow relative w-full min-w-full overflow-hidden rounded-xl",
        props.className
      )}
    >
      <MagicTweet tweet={data} {...props} />
    </div>
  )
}
