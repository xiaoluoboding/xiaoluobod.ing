"use client"

import Markdown from "marked-react"

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
      <span className="font-semibold tracking-tight">{title}</span>
      {description && (
        <div className="prose">
          <Markdown>{description}</Markdown>
        </div>
      )}
      {image?.url && (
        <div className="mt-2.5 overflow-hidden rounded-xl bg-white">
          <img
            src={image.url}
            alt={image.title || image.description}
            width={image.width}
            height={image.height}
            loading={index < 1 ? "eager" : "lazy"}
            className="animate-reveal"
          />
        </div>
      )}
    </div>
  )
}
