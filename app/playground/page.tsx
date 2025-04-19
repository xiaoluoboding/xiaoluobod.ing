"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/XCard"
import { Suspense } from "react"
import { FloatingHeader } from "@/components/FloadingHeader"
import { XScrollArea } from "@/components/ui/XScrollArea"
import Link from "next/link"

export default function PlaygroundPage() {
  const title = "Playground"

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper">
        <div className="content">
          <h1 className="text-2xl font-semibold text-neutral-100 mb-6">
            Playground
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link href="/playground/wordclock" className="block">
              <Card className="h-full hover:bg-neutral-800/50 transition-colors">
                <CardHeader>
                  <CardTitle>Word Clock</CardTitle>
                  <CardDescription>
                    English word clock inspired by QLOCKTWO®
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400">
                    An elegant display that shows the current time using words
                    rather than numbers.
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-neutral-500">
                  Interactive • Customizable
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playground/chineseclock" className="block">
              <Card className="h-full hover:bg-neutral-800/50 transition-colors">
                <CardHeader>
                  <CardTitle>中文字刻时钟</CardTitle>
                  <CardDescription>
                    显示当前时间的中文字刻时钟，灵感来自 QLOCKTWO®
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400">
                    一个用文字而非数字显示当前时间的优雅装置。
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-neutral-500">
                  可互动 • 可自定义
                </CardFooter>
              </Card>
            </Link>

            <Link href="/playground/hexclock" className="block">
              <Card className="h-full hover:bg-neutral-800/50 transition-colors">
                <CardHeader>
                  <CardTitle>Hex Clock</CardTitle>
                  <CardDescription>Time as hexadecimal colors</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-neutral-400">
                    A clock that converts time to hex color codes. Each second
                    creates a new color.
                  </p>
                </CardContent>
                <CardFooter className="text-xs text-neutral-500">
                  Interactive • Real-time
                </CardFooter>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </XScrollArea>
  )
}
