"use client"

import { useIsMobile } from "@/hooks/use-mobile"
import React, { useState, useEffect, useMemo } from "react"
import { XInput } from "../ui/XInput"
import { XLabel } from "../ui/XLabel"
import { Sheet, SheetContent, SheetTrigger } from "../ui/XSheet"
import { RadioGroup, RadioGroupItem } from "../ui/XRadioGroup"
import { COLOR_OPTIONS } from "./constants"
import MinuteDots from "./MinuteDots"

// Chinese grid layout based on the provided image (11x10 grid)
const CHINESE_GRID = [
  ["現", "在", "是", "凌", "晨", "書", "上", "午", "下", "午", "夜"],
  ["十", "一", "點", "半", "四", "點", "五", "點", "半", "六", "八"],
  ["七", "點", "半", "一", "九", "點", "半", "四", "十", "五", "分"],
  ["四", "十", "分", "三", "十", "五", "分", "零", "五", "分", "七"],
  ["六", "二", "十", "五", "分", "二", "十", "分", "五", "十", "分"],
  ["五", "三", "點", "半", "六", "點", "十", "二", "點", "半", "點"],
  ["十", "點", "八", "點", "三", "十", "分", "半", "零", "五", "分"],
  ["六", "三", "五", "十", "五", "分", "二", "十", "五", "分", "整"],
  ["三", "四", "十", "五", "分", "五", "十", "分", "二", "十", "分"],
  ["二", "十", "分", "八", "四", "十", "分", "三", "十", "五", "分"],
]

// Define special word positions based on the image
const CHINESE_SPECIAL_WORDS = {
  // 基本时间元素
  現在: [
    [0, 0],
    [0, 1],
  ],
  是: [[0, 2]],

  // 时段
  凌晨: [
    [0, 3],
    [0, 4],
  ],
  書: [[0, 5]],

  // 时段
  上午: [
    [0, 6],
    [0, 7],
  ],
  下午: [
    [0, 8],
    [0, 9],
  ],
  夜: [[0, 10]],

  // 小时
  一點: [
    [1, 1],
    [1, 2],
  ],
  二點: [
    [5, 7],
    [5, 8],
  ],
  三點: [
    [5, 1],
    [5, 2],
  ],
  四點: [
    [1, 4],
    [1, 5],
  ],
  五點: [
    [1, 6],
    [1, 7],
  ],
  六點: [
    [5, 4],
    [5, 5],
  ],
  七點: [
    [2, 0],
    [2, 1],
  ],
  八點: [
    [6, 2],
    [6, 3],
  ],
  九點: [
    [2, 4],
    [2, 5],
  ],
  十點: [
    [6, 0],
    [6, 1],
  ],
  十一點: [
    [1, 0],
    [1, 1],
    [1, 2],
  ],
  十二點: [
    [5, 6],
    [5, 7],
    [5, 8],
  ],

  // 特殊时间标记
  整: [[7, 10]],
}

// 分钟类型和位置映射
const MINUTE_POSITIONS = {
  // 整 (on the hour) - common position for all hours
  整: [[7, 10]],

  // Half (半) positions for each hour row
  半_1: [[1, 3]], // 适用于 1, 11 点（第1行）
  半_2: [[1, 8]], // 适用于 4, 5 点（第1行）
  半_3: [[2, 2]], // 适用于 7点（第2行）
  半_4: [[2, 6]], // 适用于 9 点（第2行）
  半_5: [[5, 3]], // 适用于 3（第5行）
  半_6: [[5, 9]], // 适用于 2, 6, 12 点（第5行）
  半_7: [[6, 7]], // 适用于 8, 10 点（第6行）

  // Group 1: For hours in row 1 (一点(1), 四点(4), 五点(5), 十一点(11))
  零五分_1: [
    [3, 7],
    [3, 8],
    [3, 9],
  ],
  十分_1: [
    [4, 9],
    [4, 10],
  ],
  十五分_1: [
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  二十分_1: [
    [4, 5],
    [4, 6],
    [4, 7],
  ],
  二十五分_1: [
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  三十五分_1: [
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  四十分_1: [
    [3, 0],
    [3, 1],
    [3, 2],
  ],
  四十五分_1: [
    [2, 7],
    [2, 8],
    [2, 9],
    [2, 10],
  ],
  五十分_1: [
    [4, 8],
    [4, 9],
    [4, 10],
  ],
  五十五分_1: [
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],

  // Group 2: For hours in row 2 (七点(7), 九点(9))
  五分_2: [
    [3, 7],
    [3, 8],
    [3, 9],
  ],
  十分_2: [
    [4, 9],
    [4, 10],
  ],
  十五分_2: [
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  二十分_2: [
    [4, 5],
    [4, 6],
    [4, 7],
  ],
  二十五分_2: [
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
  ],
  三十五分_2: [
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  四十分_2: [
    [3, 0],
    [3, 1],
    [3, 2],
  ],
  四十五分_2: [
    [3, 3],
    [3, 4],
    [3, 5],
    [3, 6],
  ],
  五十分_2: [
    [4, 8],
    [4, 9],
    [4, 10],
  ],
  五十五分_2: [
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],

  // Group 3: For hours in row 5 (三点(3), 六点(6), 十二点(12))
  零五分_5: [
    [6, 8],
    [6, 9],
    [6, 10],
  ],
  十分_5: [
    [6, 5],
    [6, 6],
  ],
  十五分_5: [
    [7, 7],
    [7, 8],
    [7, 9],
  ],
  二十分_5: [
    [8, 8],
    [8, 9],
    [8, 10],
  ],
  二十五分_5: [
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
  ],
  三十五分_5: [
    [9, 7],
    [9, 8],
    [9, 9],
    [9, 10],
  ],
  四十分_5: [
    [9, 4],
    [9, 5],
    [9, 6],
  ],
  四十五分_5: [
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
  ],
  五十分_5: [
    [8, 5],
    [8, 6],
    [8, 7],
  ],
  五十五分_5: [
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],

  // Group 4: For hours in row 6 (八点(8), 十点(10))
  零五分_6: [
    [6, 8],
    [6, 9],
    [6, 10],
  ],
  十分_6: [
    [8, 9],
    [8, 10],
  ],
  十五分_6: [
    [7, 7],
    [7, 8],
    [7, 9],
  ],
  二十分_6: [
    [8, 8],
    [8, 9],
    [8, 10],
  ],
  二十五分_6: [
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
  ],
  三十五分_6: [
    [9, 7],
    [9, 8],
    [9, 9],
    [9, 10],
  ],
  四十分_6: [
    [9, 4],
    [9, 5],
    [9, 6],
  ],
  四十五分_6: [
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
  ],
  五十分_6: [
    [8, 5],
    [8, 6],
    [8, 7],
  ],
  五十五分_6: [
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],

  // Group 5: For hours in row 9 (二点(2))
  零五分_9: [
    [6, 8],
    [6, 9],
    [6, 10],
  ],
  十分_9: [
    [9, 5],
    [9, 6],
  ],
  十五分_9: [
    [8, 2],
    [8, 3],
    [8, 4],
  ],
  二十分_9: [
    [8, 8],
    [8, 9],
    [8, 10],
  ],
  二十五分_9: [
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
  ],
  三十五分_9: [
    [9, 7],
    [9, 8],
    [9, 9],
    [9, 10],
  ],
  四十分_9: [
    [9, 6],
    [9, 4],
    [9, 5],
  ],
  四十五分_9: [
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
  ],
  五十分_9: [
    [8, 5],
    [8, 6],
    [8, 7],
  ],
  五十五分_9: [
    [7, 2],
    [7, 3],
    [7, 4],
    [7, 5],
  ],
}

// 获取小时在网格中的位置
function getHourRowPosition(hour: number): number {
  switch (hour) {
    case 1:
      return 1 // 一点在第1行
    case 2:
      return 9 // 二点在第9行
    case 3:
      return 5 // 三点在第5行
    case 4:
      return 1 // 四点在第1行
    case 5:
      return 1 // 五点在第1行
    case 6:
      return 5 // 六点在第5行
    case 7:
      return 2 // 七点在第2行
    case 8:
      return 6 // 八点在第6行
    case 9:
      return 2 // 九点在第2行
    case 10:
      return 6 // 十点在第6行
    case 11:
      return 1 // 十一点在第1行
    case 12:
      return 5 // 十二点在第5行
    default:
      return 0
  }
}

// 根据小时选择合适的分钟显示位置
function getMinuteWords(hour: number, minute: number): string {
  // Round minutes to the nearest 5
  const roundedMinutes = Math.round(minute / 5) * 5
  const hourRow = getHourRowPosition(hour)

  if (roundedMinutes === 0) {
    return "整"
  } else if (roundedMinutes === 30) {
    // 返回与小时行匹配的"半"字位置
    switch (hour) {
      case 1:
      case 11: // 一点(1), 十一点(11) 在第1行
        return "半_1"
      case 4:
      case 5: // 四点(4), 五点(5) 在第1行
        return "半_2"
      case 7: // 七点(7) 在第2行
        return "半_3"
      case 9: // 九点(9) 在第2行
        return "半_4"
      case 3:
        return "半_5"
      case 2:
      case 6:
      case 12: // 三点(3), 六点(6), 十二点(12) 在第5行
        return "半_6"
      case 8:
      case 10: // 八点(8), 十点(10) 在第6行
        return "半_7"
      default:
        return "半_1" // 默认使用第1行的"半"
    }
  } else {
    // 为不同的小时位置选择合适的分钟表示
    // 所有分钟显示应位于小时之下的行
    switch (hourRow) {
      case 1: // 一点(1), 四点(4), 五点(5), 十一点(11) 在第1行
        if (roundedMinutes === 5) return "零五分_1"
        if (roundedMinutes === 10) return "十分_1"
        if (roundedMinutes === 15) return "十五分_1"
        if (roundedMinutes === 20) return "二十分_1"
        if (roundedMinutes === 25) return "二十五分_1"
        if (roundedMinutes === 35) return "三十五分_1"
        if (roundedMinutes === 40) return "四十分_1"
        if (roundedMinutes === 45) return "四十五分_1"
        if (roundedMinutes === 50) return "五十分_1"
        if (roundedMinutes === 55) return "五十五分_1"
        break

      case 2: // 七点(7), 九点(9) 在第2行
        if (roundedMinutes === 5) return "五分_2"
        if (roundedMinutes === 10) return "十分_2"
        if (roundedMinutes === 15) return "十五分_2"
        if (roundedMinutes === 20) return "二十分_2"
        if (roundedMinutes === 25) return "二十五分_2"
        if (roundedMinutes === 35) return "三十五分_2"
        if (roundedMinutes === 40) return "四十分_2"
        if (roundedMinutes === 45) return "四十五分_2"
        if (roundedMinutes === 50) return "五十分_2"
        if (roundedMinutes === 55) return "五十五分_2"
        break

      case 5: // 三点(3), 六点(6), 十二点(12) 在第5行
        if (roundedMinutes === 5) return "零五分_5"
        if (roundedMinutes === 10) return "十分_5"
        if (roundedMinutes === 15) return "十五分_5"
        if (roundedMinutes === 20) return "二十分_5"
        if (roundedMinutes === 25) return "二十五分_5"
        if (roundedMinutes === 35) return "三十五分_5"
        if (roundedMinutes === 40) return "四十分_5"
        if (roundedMinutes === 45) return "四十五分_5"
        if (roundedMinutes === 50) return "五十分_5"
        if (roundedMinutes === 55) return "五十五分_5"
        break

      case 6: // 八点(8), 十点(10) 在第6行
        if (roundedMinutes === 5) return "零五分_6"
        if (roundedMinutes === 10) return "十分_6"
        if (roundedMinutes === 15) return "十五分_6"
        if (roundedMinutes === 20) return "二十分_6"
        if (roundedMinutes === 25) return "二十五分_6"
        if (roundedMinutes === 35) return "三十五分_6"
        if (roundedMinutes === 40) return "四十分_6"
        if (roundedMinutes === 45) return "四十五分_6"
        if (roundedMinutes === 50) return "五十分_6"
        if (roundedMinutes === 55) return "五十五分_6"
        break

      case 9: // 二点(2) 在第9行
        if (roundedMinutes === 5) return "零五分_9"
        if (roundedMinutes === 10) return "十分_9"
        if (roundedMinutes === 15) return "十五分_9"
        if (roundedMinutes === 20) return "二十分_9"
        if (roundedMinutes === 25) return "二十五分_9"
        if (roundedMinutes === 35) return "三十五分_9"
        if (roundedMinutes === 40) return "四十分_9"
        if (roundedMinutes === 45) return "四十五分_9"
        if (roundedMinutes === 50) return "五十分_9"
        if (roundedMinutes === 55) return "五十五分_9"
        break
    }
  }

  // 如果没有特殊规则匹配，使用默认的分钟表示
  if (roundedMinutes === 5) return "零五分_1"
  if (roundedMinutes === 10) return "十分_1"
  if (roundedMinutes === 15) return "十五分_1"
  if (roundedMinutes === 20) return "二十分_1"
  if (roundedMinutes === 25) return "二十五分_1"
  if (roundedMinutes === 35) return "三十五分_1"
  if (roundedMinutes === 40) return "四十分_1"
  if (roundedMinutes === 45) return "四十五分_1"
  if (roundedMinutes === 50) return "五十分_1"
  if (roundedMinutes === 55) return "五十五分_1"
  if (roundedMinutes === 60) return "整"

  return ""
}

// Helper function to get Chinese time words
function getChineseTimeWords(testDate?: Date) {
  const now = testDate || new Date()
  let hour = now.getHours()
  const minute = now.getMinutes()

  // Period of day
  const words = ["現在", "是"]

  // Add time period
  if (hour >= 0 && hour < 6) {
    words.push("凌晨")
  } else if (hour >= 6 && hour < 12) {
    words.push("上午")
  } else if (hour >= 12 && hour < 18) {
    words.push("下午")
  } else {
    words.push("夜")
  }

  // Convert to 12-hour format
  hour = hour % 12
  if (hour === 0) hour = 12

  // Add hour
  if (hour === 1) words.push("一點")
  else if (hour === 2) words.push("二點")
  else if (hour === 3) words.push("三點")
  else if (hour === 4) words.push("四點")
  else if (hour === 5) words.push("五點")
  else if (hour === 6) words.push("六點")
  else if (hour === 7) words.push("七點")
  else if (hour === 8) words.push("八點")
  else if (hour === 9) words.push("九點")
  else if (hour === 10) words.push("十點")
  else if (hour === 11) words.push("十一點")
  else if (hour === 12) words.push("十二點")

  // Add minutes
  const minuteWord = getMinuteWords(hour, minute)
  if (minuteWord) {
    words.push(minuteWord)
  }

  return { words, exactMinutes: minute }
}

// Helper function to get minute dots
function getChineseMinuteDots(exactMinutes: number) {
  // Get the remainder minutes (0-4)
  return exactMinutes % 5
}

// Full day time testing function
function runFullDayTest() {
  const testTimes = []
  const baseDate = new Date()

  // Create test cases for every hour with different minute values
  for (let hour = 0; hour < 24; hour++) {
    // Test cases with common minute values: 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55
    const minuteValues = [0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55]

    // Also add some non-standard minutes to test rounding (2, 13, 27, 33, 49, 58)
    const nonStandardMinutes = [2, 13, 27, 33, 49, 58]

    for (const minute of [...minuteValues, ...nonStandardMinutes]) {
      const testDate = new Date(baseDate)
      testDate.setHours(hour, minute, 0, 0)

      const { words, exactMinutes } = getChineseTimeWords(testDate)
      const minuteDots = getChineseMinuteDots(exactMinutes)

      testTimes.push({
        time: testDate.toLocaleTimeString("en-US"),
        words,
        minuteDots,
        formattedTime: `${hour}:${minute.toString().padStart(2, "0")}`,
      })
    }
  }

  return testTimes
}

const ChineseWordClock: React.FC = () => {
  const [activeWords, setActiveWords] = useState<string[]>([])
  const [minuteDotCount, setMinuteDotCount] = useState(0)
  const [neonColor, setNeonColor] = useState<string>("#4DF5FF") // Default ocean blue
  const [autoChangeEnabled, setAutoChangeEnabled] = useState(true)
  const [testMode, setTestMode] = useState(false)
  const [testTimeIndex, setTestTimeIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const [testTimes, setTestTimes] = useState<
    Array<{
      time: string
      words: string[]
      minuteDots: number
      formattedTime: string
    }>
  >([])
  const isMobile = useIsMobile()

  const colorOptions = useMemo(() => {
    return COLOR_OPTIONS
  }, [])

  // Initialize test times
  useEffect(() => {
    if (testMode && testTimes.length === 0) {
      setTestTimes(runFullDayTest())
    }
  }, [testMode, testTimes.length])

  useEffect(() => {
    const updateTime = () => {
      if (testMode && testTimes.length > 0) {
        const currentTest = testTimes[testTimeIndex]
        setActiveWords(currentTest.words)
        setMinuteDotCount(currentTest.minuteDots)
      } else {
        const { words, exactMinutes } = getChineseTimeWords()
        setActiveWords(words)
        setMinuteDotCount(getChineseMinuteDots(exactMinutes))
      }
    }

    updateTime()

    // Only set interval if not in test mode
    let interval: NodeJS.Timeout | null = null
    if (!testMode) {
      interval = setInterval(updateTime, 1000)
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [testMode, testTimes, testTimeIndex])

  // Auto change color every 5 minutes
  useEffect(() => {
    if (!autoChangeEnabled || testMode) return

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
  }, [autoChangeEnabled, colorOptions, testMode])

  const isHighlighted = (rowIndex: number, colIndex: number): boolean => {
    // Special case for the "書" character when hovering
    if (rowIndex === 0 && colIndex === 5 && isHovering) {
      return true
    }

    // Normal processing for all characters
    for (const word of activeWords) {
      // 处理常规词汇
      if (CHINESE_SPECIAL_WORDS[word as keyof typeof CHINESE_SPECIAL_WORDS]) {
        for (const [r, c] of CHINESE_SPECIAL_WORDS[
          word as keyof typeof CHINESE_SPECIAL_WORDS
        ]) {
          if (r === rowIndex && c === colIndex) {
            return true
          }
        }
      }

      // 处理分钟词汇 - 使用动态位置
      // 先检查是否有带后缀的分钟词
      const minuteWithSuffix = Object.keys(MINUTE_POSITIONS).find(
        (key) => key.startsWith(word) && (key === word || key.includes("_"))
      )

      if (minuteWithSuffix) {
        for (const [r, c] of MINUTE_POSITIONS[
          minuteWithSuffix as keyof typeof MINUTE_POSITIONS
        ]) {
          if (r === rowIndex && c === colIndex) {
            return true
          }
        }
      } else if (MINUTE_POSITIONS[word as keyof typeof MINUTE_POSITIONS]) {
        // 如果没有找到带后缀的，则尝试直接匹配
        for (const [r, c] of MINUTE_POSITIONS[
          word as keyof typeof MINUTE_POSITIONS
        ]) {
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
        0 0 4px ${neonColor},
        0 0 8px ${neonColor},
        0 0 12px ${neonColor},
        0 0 16px ${neonColor}
      `,
      filter: "brightness(1.5)",
      fontWeight: "semibold",
    }
  }

  const getShuPulseStyle = () => {
    if (!isHovering) return {}

    return {
      color: neonColor,
      textShadow: `
        0 0 4px ${neonColor},
        0 0 8px ${neonColor},
        0 0 12px ${neonColor},
        0 0 16px ${neonColor}
      `,
      filter: "brightness(1.5)",
      fontWeight: "semibold",
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

  // Test mode handlers
  const toggleTestMode = () => {
    setTestMode(!testMode)
    setTestTimeIndex(0)
  }

  const goToNextTestTime = () => {
    if (testTimes.length > 0) {
      setTestTimeIndex((prev) => (prev + 1) % testTimes.length)
    }
  }

  const goToPrevTestTime = () => {
    if (testTimes.length > 0) {
      setTestTimeIndex((prev) => (prev === 0 ? testTimes.length - 1 : prev - 1))
    }
  }

  const ColorPickerContent = () => (
    <div className="space-y-4">
      <div>
        <h4 className="font-medium text-neutral-100 mb-2">選擇顏色</h4>
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
        <h4 className="font-medium text-neutral-100">自動變換顏色</h4>
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
        <h4 className="font-medium text-neutral-100 mb-2">自定義顏色</h4>
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

      {/* <div className="pt-6 border-t border-neutral-700">
        <h4 className="font-medium text-neutral-100 mb-3">時間測試模式</h4>
        <div className="flex items-center justify-between mb-4">
          <span className="text-neutral-300">開啟測試模式</span>
          <div className="relative inline-flex h-6 w-11 items-center rounded-full border-transparent transition-colors bg-neutral-700 focus:outline-none">
            <input
              type="checkbox"
              className="peer sr-only"
              checked={testMode}
              onChange={toggleTestMode}
              id="test-mode"
            />
            <span
              className={`${
                testMode
                  ? "translate-x-6 bg-white"
                  : "translate-x-1 bg-neutral-400"
              } inline-block h-4 w-4 transform rounded-full transition-transform`}
            />
            <label
              htmlFor="test-mode"
              className="absolute inset-0 cursor-pointer rounded-full"
            />
          </div>
        </div>

        {testMode && testTimes.length > 0 && (
          <div className="space-y-3">
            <div className="text-center text-white font-medium">
              {testTimes[testTimeIndex].formattedTime} -{" "}
              {testTimes[testTimeIndex].words.join(" ")}
            </div>
            <div className="flex justify-between gap-2">
              <button
                onClick={goToPrevTestTime}
                className="bg-neutral-700 hover:bg-neutral-600 text-white py-1 px-3 rounded flex-1"
              >
                上一個
              </button>
              <button
                onClick={goToNextTestTime}
                className="bg-neutral-700 hover:bg-neutral-600 text-white py-1 px-3 rounded flex-1"
              >
                下一個
              </button>
            </div>
            <div className="text-neutral-400 text-xs text-center">
              測試進度: {testTimeIndex + 1} / {testTimes.length}
            </div>
          </div>
        )}
      </div> */}
    </div>
  )

  const clockFace = (
    <div
      className="w-full sm:max-w-lg lg:max-w-2xl aspect-square bg-black rounded-lg shadow-2xl overflow-hidden relative"
      style={getNeonBorderStyle()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <MinuteDots count={minuteDotCount} color={neonColor} type="square" />
      <div className="grid grid-rows-10 grid-cols-11 gap-1 h-full p-6 z-10 relative">
        {CHINESE_GRID.map((row, rowIndex) =>
          row.map((char, colIndex) => {
            const highlighted = isHighlighted(rowIndex, colIndex)
            const isShuChar = rowIndex === 0 && colIndex === 5

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={`flex items-center justify-center text-sm sm:text-base md:text-xl lg:text-2xl text-glow-transition ${
                  highlighted ? "" : "text-neutral-700"
                } ${isShuChar ? "cursor-pointer z-20 relative" : ""}`}
                style={
                  isShuChar ? getShuPulseStyle() : getNeonStyle(highlighted)
                }
              >
                {isShuChar ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <button
                        className={`w-full h-full flex items-center justify-center ${
                          isHovering ? "pulse-animation" : ""
                        }`}
                        tabIndex={0}
                        aria-label="開啟顏色選擇器"
                        type="button"
                      >
                        {char}
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
                  char
                )}
              </div>
            )
          })
        )}
      </div>
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
          當前時間=表盤上時間+亮起的<span className="text-primary">圓點</span>
          個數（每個圓點表示1分鐘），將鼠標懸停在&quot;
          <span className="text-primary">書</span>&quot;字可以更改顏色
          {testMode && testTimes.length > 0 && (
            <> | 測試模式：{testTimes[testTimeIndex].formattedTime}</>
          )}
        </p>
        <p className="text-xs text-neutral-400">
          中文字刻時鐘，靈感來自 QLOCKTWO®
        </p>
      </div>
    </div>
  )
}

export default ChineseWordClock
