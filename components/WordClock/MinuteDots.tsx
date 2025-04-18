import React from "react"

interface MinuteDotsProps {
  count: number
  color: string
}

const MinuteDots: React.FC<MinuteDotsProps> = ({ count, color }) => {
  // Generate neon glow style for dots
  const getNeonDotStyle = (active: boolean) => {
    if (!active) return {}

    return {
      backgroundColor: color,
      boxShadow: `
        0 0 5px ${color},
        0 0 10px ${color}
      `,
      filter: "brightness(1.5)",
    }
  }

  return (
    <div className="absolute inset-0">
      {/* Top left dot */}
      <div
        className={`absolute top-4 left-4 h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-500 ease-in-out ${
          count >= 1 ? "" : "bg-neutral-700"
        }`}
        style={getNeonDotStyle(count >= 1)}
      />
      {/* Top right dot */}
      <div
        className={`absolute top-4 right-4 h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-500 ease-in-out ${
          count >= 2 ? "" : "bg-neutral-700"
        }`}
        style={getNeonDotStyle(count >= 2)}
      />
      {/* Bottom left dot */}
      <div
        className={`absolute bottom-4 left-4 h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-500 ease-in-out ${
          count >= 3 ? "" : "bg-neutral-700"
        }`}
        style={getNeonDotStyle(count >= 3)}
      />
      {/* Bottom right dot */}
      <div
        className={`absolute bottom-4 right-4 h-2 w-2 lg:h-3 lg:w-3 rounded-full transition-all duration-500 ease-in-out ${
          count >= 4 ? "" : "bg-neutral-700"
        }`}
        style={getNeonDotStyle(count >= 4)}
      />
    </div>
  )
}

export default MinuteDots
