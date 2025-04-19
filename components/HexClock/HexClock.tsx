"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const HexClock = () => {
  const [time, setTime] = useState<Date>(new Date())
  const [hexColor, setHexColor] = useState<string>("#000000")
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(now)

      // Convert time to hex color
      const hours = now.getHours().toString().padStart(2, "0")
      const minutes = now.getMinutes().toString().padStart(2, "0")
      const seconds = now.getSeconds().toString().padStart(2, "0")

      const newHexColor = `#${hours}${minutes}${seconds}`
      setHexColor(newHexColor)
    }

    // Update immediately
    updateTime()

    // Update every second
    const interval = setInterval(updateTime, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeString = `${time.getHours().toString().padStart(2, "0")}:${time
    .getMinutes()
    .toString()
    .padStart(2, "0")}:${time.getSeconds().toString().padStart(2, "0")}`

  const textColor = getBrightness(hexColor) > 128 ? "#000000" : "#FFFFFF"

  return (
    <div
      className="flex flex-col items-center justify-center w-full"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <motion.div
        className="w-full h-screen flex flex-col items-center justify-center transition-colors duration-500 shadow-xl"
        style={{ backgroundColor: hexColor }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.h1
              key={isHovering ? "time" : "hex"}
              className="text-5xl md:text-7xl font-bold mb-6 font-mono tabular-nums select-none"
              style={{ color: textColor }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              {isHovering ? timeString : hexColor}
            </motion.h1>
          </AnimatePresence>

          <motion.div
            className="mt-2 text-base md:text-lg text-center font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            style={{ color: textColor }}
          >
            <p>Hover to see time, mouse out to see color</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}

// Function to calculate brightness of a hex color
const getBrightness = (hexColor: string): number => {
  // Remove the # if present
  const hex = hexColor.replace("#", "")

  // Parse the R, G, B components
  const r = parseInt(hex.substring(0, 2), 16) || 0
  const g = parseInt(hex.substring(2, 4), 16) || 0
  const b = parseInt(hex.substring(4, 6), 16) || 0

  // Calculate brightness using the perceived brightness formula
  // (0.299*R + 0.587*G + 0.114*B)
  return 0.299 * r + 0.587 * g + 0.114 * b
}

export default HexClock
