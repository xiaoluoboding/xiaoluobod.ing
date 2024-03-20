import Link from "next/link"
import NextImage from "next/image"

// import { PROFILES, LINKS } from "@/lib/constants"

import {
  GithubIcon,
  LinkedinIcon,
  InstagramIcon,
  YoutubeIcon,
  SparklesIcon,
  PencilLineIcon,
  NavigationIcon,
  Wand2Icon,
  BookmarkIcon,
  ArmchairIcon,
  TwitterIcon,
  MailIcon,
  CodepenIcon,
} from "lucide-react"
import { NavigationLink } from "../NavigationLint"

export const PROFILES = {
  twitter: {
    title: "X (Twitter)",
    username: "robert_shaw_x",
    url: "https://twitter.com/intent/user?screen_name=robert_shaw_x",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        width="44"
        height="44"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="#000000"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
  github: {
    title: "GitHub",
    url: "https://github.com/xiaoluoboding",
    icon: <GithubIcon size={16} />,
  },
  codepen: {
    title: "CodePen",
    url: "https://codepen.io/xiaoluoboding",
    icon: <CodepenIcon size={16} />,
  },
  dm: {
    title: "Direct Message",
    url: "https://dm.mew/robert",
    icon: <MailIcon size={16} />,
  },
}

export const LINKS = [
  {
    href: "/",
    label: "Home",
    icon: <SparklesIcon size={16} />,
  },
  {
    href: "/writing",
    label: "Writing",
    icon: <PencilLineIcon size={16} />,
  },
  {
    href: "/journey",
    label: "Journey",
    icon: <NavigationIcon size={16} />,
  },
  {
    href: "/stack",
    label: "Stack",
    icon: <Wand2Icon size={16} />,
  },
  {
    href: "/workspace",
    label: "Workspace",
    icon: <ArmchairIcon size={16} />,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: <BookmarkIcon size={16} />,
  },
]

export const MenuContent = () => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <Link href="/" className="link-card inline-flex items-center gap-2 p-2">
          <NextImage
            src="/me.png"
            alt="Robert Shaw"
            width={40}
            height={40}
            loading="lazy"
            className="rounded-full border shadow-sm"
          />
          <div className="flex flex-col">
            <span className="font-semibold tracking-tight">Robert Shaw</span>
            <span className="text-gray-600">Software Engineer</span>
          </div>
        </Link>
        <div className="flex flex-col gap-1">
          {LINKS.map((link, linkIndex) => (
            <NavigationLink
              key={link.href}
              href={link.href}
              label={link.label}
              icon={link.icon}
              shortcutNumber={linkIndex + 1}
            />
          ))}
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 text-sm">
        <span className="px-2 text-xs font-medium leading-relaxed text-gray-600">
          Online
        </span>
        <div className="flex flex-col gap-1">
          {Object.values(PROFILES).map((profile) => (
            <NavigationLink
              key={profile.url}
              href={profile.url}
              label={profile.title}
              icon={profile?.icon}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
