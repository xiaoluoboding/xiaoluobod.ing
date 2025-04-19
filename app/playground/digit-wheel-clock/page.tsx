"use client"

import { useState, useEffect, useMemo } from "react"
import DigitWheelClock from "@/components/DigitWheelClock/DigitWheelClock"
import { COLOR_OPTIONS } from "@/components/WordClock/constants"
import { FloatingHeader } from "@/components/FloadingHeader"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { XScrollArea } from "@/components/ui/XScrollArea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/XRadioGroup"
import { XLabel } from "@/components/ui/XLabel"
import { XInput } from "@/components/ui/XInput"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/XPopover"
import { Suspense } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export default function DigitWheelClockPage() {
  const title = "Digit Wheel Clock"
  const [neonColor, setNeonColor] = useState<string>(COLOR_OPTIONS[4].value)
  const [autoChangeEnabled, setAutoChangeEnabled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const isMobile = useIsMobile()

  const colorOptions = useMemo(() => {
    return COLOR_OPTIONS
  }, [])

  const handleColorChange = (color: string) => {
    setNeonColor(color)
  }

  // Auto change color effect
  useEffect(() => {
    if (!autoChangeEnabled) return

    const changeColor = () => {
      const randomIndex = Math.floor(Math.random() * colorOptions.length)
      setNeonColor(colorOptions[randomIndex].value)
    }

    // Initial color change based on current time
    const now = new Date()
    const minutesMod5 = now.getMinutes() % 5
    const secondsRemaining = (5 - minutesMod5) * 60 - now.getSeconds()

    // Set initial timeout to sync with 5-minute intervals
    const initialTimeout = setTimeout(() => {
      changeColor()

      // Then set up the regular interval
      const interval = setInterval(changeColor, 5 * 60 * 1000)
      return () => clearInterval(interval)
    }, secondsRemaining * 1000)

    return () => clearTimeout(initialTimeout)
  }, [autoChangeEnabled, colorOptions])

  // Color picker content
  const ColorPickerContent = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-neutral-100 mb-2">选择颜色</h4>
        <RadioGroup
          value={neonColor}
          onValueChange={handleColorChange}
          className="grid grid-cols-4 gap-2"
        >
          {COLOR_OPTIONS.map((color) => (
            <div key={color.value} className="flex flex-col items-center gap-1">
              <RadioGroupItem
                value={color.value}
                id={`inline-${color.value}`}
                className="peer sr-only"
              />
              <XLabel
                htmlFor={`inline-${color.value}`}
                className="flex flex-col items-center justify-between rounded-md border-2 border-transparent p-2 hover:border-neutral-600 peer-data-[state=checked]:border-neutral-400"
              >
                <div
                  className="h-8 w-8 rounded-full mb-1"
                  style={{
                    backgroundColor: color.value,
                    boxShadow:
                      neonColor === color.value
                        ? `0 0 10px ${color.value}`
                        : "none",
                  }}
                />
                <span className="text-xs text-neutral-300">{color.label}</span>
              </XLabel>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <h4 className="font-medium text-neutral-100">自动更换颜色</h4>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full border-transparent transition-colors bg-neutral-700 focus:outline-none">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={autoChangeEnabled}
            onChange={() => setAutoChangeEnabled(!autoChangeEnabled)}
            id="inline-auto-change"
          />
          <span
            className={`${
              autoChangeEnabled
                ? "translate-x-6 bg-white"
                : "translate-x-1 bg-neutral-400"
            } inline-block h-4 w-4 transform rounded-full transition-transform`}
          />
          <label
            htmlFor="inline-auto-change"
            className="absolute inset-0 cursor-pointer rounded-full"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-neutral-100 mb-2">自定义颜色</h4>
        <div className="flex gap-3 items-center">
          <XInput
            type="color"
            value={neonColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="w-16 h-10 cursor-pointer rounded-md p-1 bg-transparent"
          />
          <XInput
            type="text"
            value={neonColor}
            onChange={(e) => handleColorChange(e.target.value)}
            className="flex-1 bg-neutral-700 border-neutral-600 text-white"
          />
        </div>
      </div>
    </div>
  )

  return (
    <XScrollArea className="scrollable-area">
      <FloatingHeader scrollTitle={title} />
      <div className="content-wrapper w-full h-[calc(100vh-48px)] sm:h-screen flex flex-col items-center justify-center bg-black p-4">
        <Suspense fallback={<LoadingSpinner />}>
          <div className="w-full flex flex-col items-center group">
            {/* Clock component */}
            <div className="w-full flex justify-center mb-2">
              <DigitWheelClock
                className="w-full"
                fontSize={isMobile ? 64 : 120}
                color={neonColor}
              />
            </div>

            {/* Color picker trigger button - only visible on hover */}
            <Popover open={isOpen} onOpenChange={setIsOpen}>
              <PopoverTrigger asChild>
                <button
                  className="w-12 h-12 rounded-full opacity-0 group-hover:opacity-80 hover:opacity-100 transition-opacity duration-300 focus:outline-none mb-4"
                  style={{
                    backgroundColor: neonColor,
                    boxShadow: `0 0 10px ${neonColor}`,
                  }}
                  aria-label="打开颜色选择器"
                >
                  <span className="sr-only">选择颜色</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="bg-neutral-800 border-neutral-700 w-80">
                <ColorPickerContent />
              </PopoverContent>
            </Popover>
          </div>
        </Suspense>
      </div>
      <style jsx global>{`
        @keyframes pulse {
          0% {
            opacity: 1;
            filter: brightness(1.5);
          }
          50% {
            opacity: 0.7;
            filter: brightness(1);
          }
          100% {
            opacity: 1;
            filter: brightness(1.5);
          }
        }

        .pulse-animation {
          animation: pulse 1.5s infinite ease-in-out;
        }
      `}</style>
    </XScrollArea>
  )
}
