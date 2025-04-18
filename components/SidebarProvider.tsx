"use client"

import { ReactNode, useEffect } from "react"
import { usePathname } from "next/navigation"
import { SideMenu } from "@/components/SideMenu"
import { MenuContent } from "@/components/SideMenu/MenuContent"
import { useSidebarStore } from "@/store/sidebar"

interface SidebarProviderProps {
  children: ReactNode
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const pathname = usePathname()
  const { isVisible, hideSidebar } = useSidebarStore()

  useEffect(() => {
    // Hide sidebar when on dock page
    if (pathname === "/dock") {
      hideSidebar()
    }
  }, [pathname, hideSidebar])

  return (
    <>
      {isVisible && (
        <SideMenu className="relative hidden lg:flex">
          <MenuContent />
        </SideMenu>
      )}
      {children}
    </>
  )
}
