/* eslint-disable @next/next/no-img-element */
import { Bookmark } from "@/lib/types"
import { Link2Icon } from "lucide-react"

// import { TweetCard } from "@/components/tweet-card/tweet-card"
// import { TWEETS_COLLECTION_ID } from "@/lib/constants"
import Image from "next/image"

interface IProps {
  bookmark: Bookmark
  order: number
}

export const BookmarkCard = ({ bookmark, order }: IProps) => {
  // if (bookmark.link && bookmark.collectionId === TWEETS_COLLECTION_ID) {
  //   const match = bookmark.link.match(/\/status\/(\d+)/) ?? []
  //   const tweetId = match[1]
  //   return <TweetCard id={tweetId} />
  // }

  return (
    <a
      key={bookmark.link}
      className="thumbnail-shadow flex aspect-auto min-w-0 cursor-pointer flex-col gap-4 overflow-hidden rounded-xl bg-white p-4 transition-colors duration-300 hover:bg-neutral-100/80"
      href={`${bookmark.link}?ref=xiaoluobo.ding`}
      target="_blank"
      rel="noopener noreferrer"
      data-bookmark-order={order}
    >
      <span className="aspect-[1200/630] overflow-hidden rounded-lg">
        <img
          src={bookmark.image || "/assets/fallback.webp"}
          alt={bookmark.title}
          width={1200}
          height={630}
          loading={order < 2 ? "eager" : "lazy"}
          className="aspect-[1200/630] animate-reveal rounded-lg border bg-cover bg-center bg-no-repeat object-cover"
        />
      </span>
      <div className="flex flex-col gap-1.5">
        <h2 className="line-clamp-1 text-lg leading-snug font-semibold">
          {bookmark.title}
        </h2>
        <span className="line-clamp-3 text-sm">
          {bookmark.description || bookmark.publisher}
        </span>
        <span className="line-clamp-1 truncate inline-flex items-center gap-1 text-xs text-neutral-500">
          <img
            src={bookmark.logo || "/assets/fallback.webp"}
            className="inline-block align-text-bottom mr-1 h-4 w-4"
            alt={bookmark.author || ""}
            width={16}
            height={16}
          />
          {bookmark.link}
        </span>
      </div>
    </a>
  )
}
