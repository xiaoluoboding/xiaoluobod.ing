"use client"

import React, { useState, useEffect, useMemo } from "react"
import { COLOR_OPTIONS } from "@/components/WordClock/constants"

interface DigitWheelProps {
  value: number
  fontSize?: number
  color: string
}

const DigitWheel: React.FC<DigitWheelProps> = ({
  value,
  fontSize = 40,
  color,
}) => {
  const digits = useMemo(() => [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], [])

  // Calculate height based on fontSize (typically 1.5x fontSize is a good ratio)
  const height = fontSize * 1.5

  // Create the filter shadow effect with reduced blur
  const neonFilter = `
    drop-shadow(0 0 1px ${color})
    drop-shadow(0 0 2px ${color})
    drop-shadow(0 0 3px ${color})
    brightness(1.3)
  `

  return (
    <div
      className="digit-wheel relative overflow-hidden"
      style={{ height: `${height}px`, width: `${fontSize * 0.75}px` }}
    >
      <div
        className="digits-container absolute transition-transform duration-500 ease-in-out will-change-transform"
        style={{
          transform: `translateY(-${value * height}px)`,
          width: "100%",
        }}
      >
        {digits.map((digit) => (
          <div
            key={digit}
            className="digit flex items-center justify-center font-mono font-bold"
            style={{
              height: `${height}px`,
              fontSize: `${fontSize}px`,
              color: color,
              filter: neonFilter,
            }}
          >
            {digit}
          </div>
        ))}
      </div>
    </div>
  )
}

interface TimeDisplayProps {
  time: Date
  showColon?: boolean
  fontSize?: number
  color?: string
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
  time,
  showColon = true,
  fontSize = 40,
  color = COLOR_OPTIONS[4].value, // Emerald (green)
}) => {
  const hours = time.getHours().toString().padStart(2, "0")
  const minutes = time.getMinutes().toString().padStart(2, "0")
  const seconds = time.getSeconds().toString().padStart(2, "0")

  // Animated colon that blinks every second
  const [colonVisible, setColonVisible] = useState(true)

  useEffect(() => {
    if (!showColon) return

    const blinkInterval = setInterval(() => {
      setColonVisible((prev) => !prev)
    }, 1000)

    return () => clearInterval(blinkInterval)
  }, [showColon])

  // Create the filter shadow effect for colons with reduced blur
  const neonFilter = `
    drop-shadow(0 0 1px ${color})
    drop-shadow(0 0 2px ${color})
    drop-shadow(0 0 3px ${color})
    brightness(1.3)
  `

  // Calculate height based on fontSize
  const colonHeight = fontSize * 1.5

  return (
    <div className="flex items-center justify-center">
      <div className="hour-container flex">
        <DigitWheel
          value={parseInt(hours[0])}
          color={color}
          fontSize={fontSize}
        />
        <DigitWheel
          value={parseInt(hours[1])}
          color={color}
          fontSize={fontSize}
        />
      </div>

      {showColon && (
        <div
          className={`colon mx-1 font-mono flex items-center justify-center transition-opacity duration-300 ${
            colonVisible ? "opacity-100" : "opacity-30"
          }`}
          style={{
            height: `${colonHeight}px`,
            fontSize: `${fontSize * 0.75}px`,
            color: color,
            filter: neonFilter,
          }}
        >
          :
        </div>
      )}

      <div className="minute-container flex">
        <DigitWheel
          value={parseInt(minutes[0])}
          color={color}
          fontSize={fontSize}
        />
        <DigitWheel
          value={parseInt(minutes[1])}
          color={color}
          fontSize={fontSize}
        />
      </div>

      {showColon && (
        <div
          className={`colon mx-1 font-mono flex items-center justify-center transition-opacity duration-300 ${
            colonVisible ? "opacity-100" : "opacity-30"
          }`}
          style={{
            height: `${colonHeight}px`,
            fontSize: `${fontSize * 0.75}px`,
            color: color,
            filter: neonFilter,
          }}
        >
          :
        </div>
      )}

      <div className="second-container flex">
        <DigitWheel
          value={parseInt(seconds[0])}
          color={color}
          fontSize={fontSize}
        />
        <DigitWheel
          value={parseInt(seconds[1])}
          color={color}
          fontSize={fontSize}
        />
      </div>
    </div>
  )
}

interface DigitWheelClockProps {
  className?: string
  fontSize?: number
  color?: string
}

const DigitWheelClock: React.FC<DigitWheelClockProps> = ({
  className = "",
  fontSize = 40,
  color = COLOR_OPTIONS[4].value, // Emerald (green)
}) => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date())

  // Update time every second
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(intervalId)
  }, [])

  return (
    <div
      className={`digit-wheel-clock flex items-center justify-center ${className}`}
    >
      <TimeDisplay time={currentTime} fontSize={fontSize} color={color} />
    </div>
  )
}

export default DigitWheelClock
