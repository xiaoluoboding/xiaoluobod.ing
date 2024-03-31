"use client"

import { useEffect, useState } from "react"

export default function DockLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])
  return (
    <>
      {isClient && (
        <div className="flex w-full relative">
          <div className="absolute top-0 right-0 inset-0 z-0 h-screen w-screen bg-white p-2 bg-[url('/assets/wallpaper-small.jpg')] bg-cover bg-center"></div>
          <div></div>
          <div className="flex-1">{children}</div>
        </div>
      )}
    </>
  )
}

export const viewport = {
  //  To fix the zoom issue on mobile for the bookmark submit form
  maximumScale: 1,
}
