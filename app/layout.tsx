import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { SideMenu } from "@/components/SideMenu"
import { Toaster } from "sonner"
import { MenuContent } from "@/components/SideMenu/MenuContent"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Robert Shaw",
  description: "My Personal Website",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <main vaul-drawer-wrapper="" className="min-h-screen bg-white">
          <div className="h-screen lg:flex">
            <SideMenu className="relative hidden lg:flex">
              <MenuContent />
            </SideMenu>
            <div className="flex flex-1">{children}</div>
          </div>
        </main>
        <Toaster
          closeButton
          richColors
          toastOptions={{
            duration: 5000,
          }}
        />
        <Script
          defer
          data-domain="xiaoluobod.ing"
          src="https://plausible.io/js/script.js"
        ></Script>
      </body>
    </html>
  )
}
