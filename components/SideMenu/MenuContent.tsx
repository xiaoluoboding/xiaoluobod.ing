import Link from "next/link"
import NextImage from "next/image"

import { NavigationLink } from "../NavigationLint"
import {
  RiBookmarkLine,
  RiCodeBoxLine,
  RiCodeSSlashLine,
  RiCodepenLine,
  RiGithubLine,
  RiGuideLine,
  RiHomeLine,
  RiMacLine,
  RiMacbookLine,
  RiMessage2Line,
  RiProductHuntLine,
  RiQuillPenLine,
  RiTwitterXLine,
} from "@remixicon/react"
import DarkmodeToggle from "../DarkmodeToggle"

export const PROFILES = {
  twitter: {
    title: "X (Twitter)",
    username: "robert_shaw_x",
    url: "https://twitter.com/intent/user?screen_name=robert_shaw_x",
    icon: <RiTwitterXLine size={16} />,
  },
  dm: {
    title: "Direct Message on X",
    url: "https://dm.new/robert",
    icon: <RiMessage2Line size={16} />,
  },
  github: {
    title: "GitHub",
    url: "https://github.com/xiaoluoboding",
    icon: <RiGithubLine size={16} />,
  },
  codepen: {
    title: "CodePen",
    url: "https://codepen.io/xiaoluoboding",
    icon: <RiCodepenLine size={16} />,
  },
  producthunt: {
    title: "ProductHunt",
    url: "https://www.producthunt.com/@xiaoluoboding",
    icon: <RiProductHuntLine size={16} />,
  },
  indiehackers: {
    title: "IndieHackers",
    url: "https://www.indiehackers.com/xiaoluoboding",
    icon: <RiCodeBoxLine size={16} />,
  },
}

export const LINKS = [
  {
    href: "/",
    label: "Home",
    icon: <RiHomeLine size={16} />,
  },
  {
    href: "/writing",
    label: "Writing",
    icon: <RiQuillPenLine size={16} />,
  },
  {
    href: "/journey",
    label: "Journey",
    icon: <RiGuideLine size={16} />,
  },
  {
    href: "/techstack",
    label: "Tech Stack",
    icon: <RiCodeSSlashLine size={16} />,
  },
  {
    href: "/dock",
    label: "Dock",
    icon: <RiMacbookLine size={16} />,
  },
  {
    href: "/workspace",
    label: "Workspace",
    icon: <RiMacLine size={16} />,
  },
  {
    href: "/bookmarks",
    label: "Bookmarks",
    icon: <RiBookmarkLine size={16} />,
  },
]

export const MenuContent = () => {
  return (
    <div className="flex w-full flex-col text-sm">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Link
            href="/"
            className="link-card inline-flex items-center gap-2 p-2 flex-1"
          >
            <NextImage
              src="/assets/me.png"
              alt="Robert Shaw"
              width={40}
              height={40}
              loading="lazy"
              className="rounded-full border shadow-sm"
            />
            <div className="flex flex-col">
              <span className="font-semibold tracking-tight text-accent-foreground">
                Robert Shaw
              </span>
              <span className="text-secondary-foreground">
                Software Engineer
              </span>
            </div>
          </Link>
          <DarkmodeToggle />
        </div>

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
