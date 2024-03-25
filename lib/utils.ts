import { cache } from "react"

import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Checks whether a given link is an external link by evaluating its href attribute.
 * If the href is empty or null, it is considered an internal link.
 * Otherwise, if the href does not start with '/' or '#', it is regarded as an external link.
 * @param href The href attribute value of the link to be checked.
 * @returns A boolean value indicating whether the link is an external link.
 */
export const isExternalLink = (href: string) => {
  if (!href) return false
  return !href.startsWith("/") && !href.startsWith("#")
}

export const sortByProperty = cache((arr: any[], prop: any) => {
  return arr?.sort((a, b) => {
    const itemA = a[prop].toUpperCase()
    const itemB = b[prop].toUpperCase()

    if (itemA < itemB) {
      return -1
    } else if (itemA > itemB) {
      return 1
    }

    return 0
  })
})
