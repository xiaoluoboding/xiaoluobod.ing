"use client"

import Markdown from "marked-react"
import Image from "next/image"

interface IProps {
  title: string
  description?: string
  image?: {
    url: string
    title?: string
    description?: string
    width?: number
    height?: number
  }
  index: number
}

export const JourneyCard = ({ title, description, image, index }: IProps) => {
  return (
    <div className="word-break-word flex flex-col">
      <span className="font-semibold tracking-tight text-accent-foreground">
        {title}
      </span>
      {description && (
        <div className="prose dark:text-neutral-400">
          <Markdown>{description}</Markdown>
        </div>
      )}
      {image?.url && (
        <div className="mt-2.5 overflow-hidden rounded-xl bg-white">
          <Image
            src={image.url || ""}
            alt={image.title || image.description || ""}
            width={500}
            height={300}
            className="w-full h-auto rounded-lg"
          />
        </div>
      )}
    </div>
  )
}
