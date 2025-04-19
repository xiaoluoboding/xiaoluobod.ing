import { useIsMobile } from "@/hooks/use-mobile"
import { getMinuteDots, getTimeInWords } from "@/lib/timeUtilts"
import React, { useState, useEffect, useMemo } from "react"
import MinuteDots from "./MinuteDots"
import { XInput } from "../ui/XInput"
import { XLabel } from "../ui/XLabel"
import { Sheet, SheetContent, SheetTrigger } from "../ui/XSheet"
import { RadioGroup, RadioGroupItem } from "../ui/XRadioGroup"
import { COLOR_OPTIONS, GRID, SPECIAL_WORDS, WordPositions } from "./constants"

const WordClock: React.FC = () => {
  const [activeWords, setActiveWords] = useState<string[]>([])
  const [minuteDotCount, setMinuteDotCount] = useState(0)
  const [neonColor, setNeonColor] = useState<string>("#4DF5FF") // Default blue
  const [autoChangeEnabled, setAutoChangeEnabled] = useState(true)
  const [isHovering, setIsHovering] = useState(false) // State for entire clock face hover
  const isMobile = useIsMobile()

  const colorOptions = useMemo(() => {
    return COLOR_OPTIONS
  }, [])

  useEffect(() => {
    const updateTime = () => {
      const { words, exactMinutes } = getTimeInWords()
      setActiveWords(words)
      setMinuteDotCount(getMinuteDots(exactMinutes))
    }

    updateTime()

    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  // Auto change color every 5 minutes
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
      const interval = setInterval(changeColor, 1 * 60 * 1000)
      return () => clearInterval(interval)
    }, secondsRemaining * 1000)

    return () => clearTimeout(initialTimeout)
  }, [autoChangeEnabled, colorOptions])

  const isHighlighted = (rowIndex: number, colIndex: number): boolean => {
    // Special case for the "A" toggle button at position [0, 5]
    if (rowIndex === 0 && colIndex === 5 && isHovering) {
      return true
    }

    for (const word of activeWords) {
      if (word === "FIVE") {
        if (activeWords.includes("PAST") || activeWords.includes("TO")) {
          if (SPECIAL_WORDS["FIVE"]) {
            for (const [r, c] of SPECIAL_WORDS["FIVE"]) {
              if (r === rowIndex && c === colIndex) return true
            }
          }
        } else {
          if (SPECIAL_WORDS["FIVE_HOUR"]) {
            for (const [r, c] of SPECIAL_WORDS["FIVE_HOUR"]) {
              if (r === rowIndex && c === colIndex) return true
            }
          }
        }
      } else if (word === "TEN") {
        if (activeWords.includes("PAST") || activeWords.includes("TO")) {
          if (SPECIAL_WORDS["TEN"]) {
            for (const [r, c] of SPECIAL_WORDS["TEN"]) {
              if (r === rowIndex && c === colIndex) return true
            }
          }
        } else {
          if (SPECIAL_WORDS["TEN_HOUR"]) {
            for (const [r, c] of SPECIAL_WORDS["TEN_HOUR"]) {
              if (r === rowIndex && c === colIndex) return true
            }
          }
        }
      } else if (SPECIAL_WORDS[word as keyof WordPositions]) {
        for (const [r, c] of SPECIAL_WORDS[word as keyof WordPositions]) {
          if (r === rowIndex && c === colIndex) {
            return true
          }
        }
      }
    }
    return false
  }

  const getNeonStyle = (highlighted: boolean) => {
    if (!highlighted) return {}

    return {
      color: neonColor,
      textShadow: `
        0 0 5px ${neonColor},
        0 0 10px ${neonColor},
        0 0 15px ${neonColor},
        0 0 20px ${neonColor}
      `,
      filter: "brightness(1.5)",
      fontWeight: "bold",
    }
  }

  // Style for the A letter when clock face is hovered
  const getAPulseStyle = () => {
    if (!isHovering) return {}

    return {
      color: neonColor,
      textShadow: `
        0 0 5px ${neonColor},
        0 0 10px ${neonColor},
        0 0 15px ${neonColor},
        0 0 20px ${neonColor}
      `,
      filter: "brightness(1.5)",
      fontWeight: "bold",
      animation: "pulse 1.5s infinite ease-in-out",
      cursor: "pointer",
    }
  }

  const handleColorChange = (color: string) => {
    setNeonColor(color)
  }

  const getNeonBorderStyle = () => {
    const colorWithOpacity = neonColor
      .replace(")", ", 0.2)")
      .replace("rgb(", "rgba(")
    return {
      boxShadow: `0 0 15px ${colorWithOpacity}, 0 0 25px ${colorWithOpacity}`,
      border: `2px solid ${colorWithOpacity}`,
    }
  }

  const ColorPickerContent = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-neutral-100 mb-2">Select Color</h4>
        <RadioGroup
          value={neonColor}
          onValueChange={handleColorChange}
          className="grid grid-cols-3 gap-2"
        >
          {colorOptions.map((color) => (
            <div key={color.value} className="flex flex-col items-center gap-1">
              <RadioGroupItem
                value={color.value}
                id={color.value}
                className="peer sr-only"
              />
              <XLabel
                htmlFor={color.value}
                className="flex flex-col items-center justify-between rounded-md border-2 border-transparent p-2 hover:border-neutral-600 peer-data-[state=checked]:border-neutral-400"
              >
                <div
                  className="h-8 w-8 rounded-full mb-1"
                  style={{ backgroundColor: color.value }}
                />
                <span className="text-xs text-neutral-300">{color.label}</span>
              </XLabel>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div className="flex items-center justify-between mt-4 mb-2">
        <h4 className="font-medium text-neutral-100">Auto-Change Color</h4>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full border-transparent transition-colors bg-neutral-700 focus:outline-none">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={autoChangeEnabled}
            onChange={() => setAutoChangeEnabled(!autoChangeEnabled)}
            id="auto-change"
          />
          <span
            className={`${
              autoChangeEnabled
                ? "translate-x-6 bg-white"
                : "translate-x-1 bg-neutral-400"
            } inline-block h-4 w-4 transform rounded-full transition-transform`}
          />
          <label
            htmlFor="auto-change"
            className="absolute inset-0 cursor-pointer rounded-full"
          />
        </div>
      </div>

      <div>
        <h4 className="font-medium text-neutral-100 mb-2">Custom Color</h4>
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

  const clockFace = (
    <div
      className="w-full sm:max-w-lg lg:max-w-2xl aspect-square bg-black rounded-lg shadow-2xl overflow-hidden relative"
      style={getNeonBorderStyle()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div className="grid grid-rows-10 grid-cols-11 gap-1 h-full p-6">
        {GRID.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const highlighted = isHighlighted(rowIndex, colIndex)
            const isAToggle = rowIndex === 0 && colIndex === 5

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center text-sm sm:text-base md:text-xl lg:text-2xl text-glow-transition ${
                  highlighted ? "" : "text-neutral-700"
                } ${isAToggle ? "cursor-pointer z-20 relative" : ""}`}
                style={isAToggle ? getAPulseStyle() : getNeonStyle(highlighted)}
              >
                {isAToggle ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className={`w-full h-full flex items-center justify-center ${
                          isHovering ? "pulse-animation" : ""
                        }`}
                        aria-label="Open color picker"
                      >
                        {letter}
                      </button>
                    </SheetTrigger>
                    <SheetContent
                      side="right"
                      className="bg-neutral-800 border-l-neutral-700"
                    >
                      <ColorPickerContent />
                    </SheetContent>
                  </Sheet>
                ) : (
                  letter
                )}
              </div>
            )
          })
        )}
      </div>
      <MinuteDots count={minuteDotCount} color={neonColor} />
    </div>
  )

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-48px)] sm:h-screen bg-neutral-900 p-4 z-10">
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
      {clockFace}

      <div className="text-primary mt-8 text-center">
        <p className="text-xs mt-2 text-neutral-400">
          Current time = clock face time + number of lit{" "}
          <span className="text-primary">dots</span>
          (each dot represents 1 minute). Hover over the clock to reveal the{" "}
          <span className="text-primary">A</span> button for color settings.
        </p>
        <p className="text-xs mt-2 text-neutral-400">
          Word Clock inspired by QLOCKTWO®
        </p>
      </div>
    </div>
  )
}

export default WordClock
