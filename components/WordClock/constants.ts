export interface ColorOption {
  value: string
  label: string
}

export const COLOR_OPTIONS: ColorOption[] = [
  { value: "#1EAEDB", label: "Ocean Blue" },
  { value: "#8B5CF6", label: "Violet" },
  { value: "#D946EF", label: "Magenta" },
  { value: "#FFD700", label: "Gold" },
  { value: "#F97316", label: "Orange" },
  { value: "#10B981", label: "Emerald" },
  { value: "#be123c", label: "Rose" },
]

export type WordPositions = Record<string, number[][]>

export const GRID = [
  ["I", "T", "L", "I", "S", "A", "S", "T", "I", "M", "E"],
  ["A", "C", "Q", "U", "A", "R", "T", "E", "R", "D", "C"],
  ["T", "W", "E", "N", "T", "Y", "F", "I", "V", "E", "X"],
  ["H", "A", "L", "F", "S", "T", "E", "N", "F", "T", "O"],
  ["P", "A", "S", "T", "E", "R", "U", "N", "I", "N", "E"],
  ["O", "N", "E", "S", "I", "X", "T", "H", "R", "E", "E"],
  ["F", "O", "U", "R", "F", "I", "V", "E", "T", "W", "O"],
  ["E", "I", "G", "H", "T", "E", "L", "E", "V", "E", "N"],
  ["S", "E", "V", "E", "N", "T", "W", "E", "L", "V", "E"],
  ["T", "E", "N", "S", "O'", "C", "L", "O", "C", "K", "M"],
]

export const SPECIAL_WORDS: WordPositions = {
  IT: [
    [0, 0],
    [0, 1],
  ],
  IS: [
    [0, 3],
    [0, 4],
  ],
  QUARTER: [
    [1, 2],
    [1, 3],
    [1, 4],
    [1, 5],
    [1, 6],
    [1, 7],
    [1, 8],
  ],
  TWENTY: [
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [2, 4],
    [2, 5],
  ],
  FIVE: [
    [2, 6],
    [2, 7],
    [2, 8],
    [2, 9],
  ],
  HALF: [
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
  ],
  TEN: [
    [3, 5],
    [3, 6],
    [3, 7],
  ],
  TO: [
    [3, 9],
    [3, 10],
  ],
  PAST: [
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
  ],
  NINE: [
    [4, 7],
    [4, 8],
    [4, 9],
    [4, 10],
  ],
  ONE: [
    [5, 0],
    [5, 1],
    [5, 2],
  ],
  SIX: [
    [5, 3],
    [5, 4],
    [5, 5],
  ],
  THREE: [
    [5, 6],
    [5, 7],
    [5, 8],
    [5, 9],
    [5, 10],
  ],
  FOUR: [
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  FIVE_HOUR: [
    [6, 4],
    [6, 5],
    [6, 6],
    [6, 7],
  ],
  TWO: [
    [6, 8],
    [6, 9],
    [6, 10],
  ],
  EIGHT: [
    [7, 0],
    [7, 1],
    [7, 2],
    [7, 3],
    [7, 4],
  ],
  ELEVEN: [
    [7, 5],
    [7, 6],
    [7, 7],
    [7, 8],
    [7, 9],
    [7, 10],
  ],
  SEVEN: [
    [8, 0],
    [8, 1],
    [8, 2],
    [8, 3],
    [8, 4],
  ],
  TWELVE: [
    [8, 5],
    [8, 6],
    [8, 7],
    [8, 8],
    [8, 9],
    [8, 10],
  ],
  TEN_HOUR: [
    [9, 0],
    [9, 1],
    [9, 2],
  ],
  OCLOCK: [
    [9, 4],
    [9, 5],
    [9, 6],
    [9, 7],
    [9, 8],
    [9, 9],
  ],
}
