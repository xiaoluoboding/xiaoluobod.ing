export const getTimeInWords = () => {
  const now = new Date()
  const hours = now.getHours() % 12 || 12 // Convert to 12-hour format
  const minutes = now.getMinutes()

  // Round minutes to the nearest 5
  const roundedMinutes = Math.round(minutes / 5) * 5

  // Words to highlight
  let words: string[] = ["IT", "IS"]

  // Handle the hour calculation differently
  // For "to" times, we need the next hour
  // For "past" times, we need the current hour
  let hourToDisplay = hours

  // Determine minute phrasing
  if (roundedMinutes === 0) {
    words.push("OCLOCK")
  } else if (roundedMinutes === 5) {
    words.push("FIVE", "PAST")
  } else if (roundedMinutes === 10) {
    words.push("TEN", "PAST")
  } else if (roundedMinutes === 15) {
    words.push("QUARTER", "PAST")
  } else if (roundedMinutes === 20) {
    words.push("TWENTY", "PAST")
  } else if (roundedMinutes === 25) {
    words.push("TWENTY", "FIVE", "PAST")
  } else if (roundedMinutes === 30) {
    words.push("HALF", "PAST")
  } else if (roundedMinutes === 35) {
    words.push("TWENTY", "FIVE", "TO")
    hourToDisplay = (hours % 12) + 1 // Next hour
  } else if (roundedMinutes === 40) {
    words.push("TWENTY", "TO")
    hourToDisplay = (hours % 12) + 1 // Next hour
  } else if (roundedMinutes === 45) {
    words.push("QUARTER", "TO")
    hourToDisplay = (hours % 12) + 1 // Next hour
  } else if (roundedMinutes === 50) {
    words.push("TEN", "TO")
    hourToDisplay = (hours % 12) + 1 // Next hour
  } else if (roundedMinutes === 55) {
    words.push("FIVE", "TO")
    hourToDisplay = (hours % 12) + 1 // Next hour
  } else if (roundedMinutes === 60) {
    words.push("OCLOCK")
    hourToDisplay = (hours % 12) + 1 // Next hour
  }

  // Fix for "12 + 1" which should be "1" not "13"
  if (hourToDisplay > 12) {
    hourToDisplay = 1
  }

  // Hour word
  const hourName = getHourName(hourToDisplay)

  // Add the hour name at the end of the words array, not in the middle
  words.push(hourName)

  return {
    words,
    exactMinutes: minutes,
    roundedMinutes,
  }
}

const getHourName = (hour: number): string => {
  const hourNames = [
    "TWELVE",
    "ONE",
    "TWO",
    "THREE",
    "FOUR",
    "FIVE_HOUR",
    "SIX",
    "SEVEN",
    "EIGHT",
    "NINE",
    "TEN_HOUR",
    "ELEVEN",
    "TWELVE",
  ]
  return hourNames[hour]
}

// Get minutes for corner dots (remaining minutes after the rounded 5-minute interval)
export const getMinuteDots = (exactMinutes: number): number => {
  return exactMinutes % 5
}

// Check if a specific word should be highlighted
export const shouldHighlight = (
  word: string,
  activeWords: string[]
): boolean => {
  return activeWords.includes(word)
}
