import { PERFUMES } from './perfumes'

export const QUIZ_QS = [
  { q: "Pick a mood", sub: "How do you want to feel when you wear it?", opts: [
    { v: "Mysterious", sym: "◈", grad: "linear-gradient(155deg,#1a0a2e,#6b2d7a)", col: "#d8a8ff" },
    { v: "Fresh",      sym: "◉", grad: "linear-gradient(155deg,#1a5f7a,#8fccd8)", col: "#b8f0f8" },
    { v: "Romantic",   sym: "✿", grad: "linear-gradient(155deg,#7a2a4a,#e8a8b8)", col: "#ffd8e8" },
    { v: "Bold",       sym: "◆", grad: "linear-gradient(155deg,#3a1a0a,#a84020)", col: "#ffb888" },
  ]},
  { q: "Choose a season", sub: "When will you reach for this most?", opts: [
    { v: "Spring", sym: "✿", grad: "linear-gradient(155deg,#1a5a2a,#7ab87a)", col: "#c8f0a8" },
    { v: "Summer", sym: "✦", grad: "linear-gradient(155deg,#8b6020,#e8c050)", col: "#fff0b0" },
    { v: "Autumn", sym: "◈", grad: "linear-gradient(155deg,#6b4020,#c4843a)", col: "#ffe0b0" },
    { v: "Winter", sym: "❄", grad: "linear-gradient(155deg,#1a2a4a,#4a7ab0)", col: "#b8d8f0" },
  ]},
  { q: "Your ideal weekend", sub: "Where does your imagination take you?", opts: [
    { v: "Beach",     sym: "∿", grad: "linear-gradient(155deg,#1a5f7a,#2d9bb0)", col: "#b8e8f0" },
    { v: "Forest",    sym: "◈", grad: "linear-gradient(155deg,#1c3a1c,#4a7a3a)", col: "#a8d898" },
    { v: "City",      sym: "◆", grad: "linear-gradient(155deg,#1a1a2e,#4a4a7a)", col: "#c8c8f0" },
    { v: "Cosy Home", sym: "♥", grad: "linear-gradient(155deg,#6b3a1a,#c4843a)", col: "#ffe0b0" },
  ]},
  { q: "Pick a texture", sub: "What does your perfect scent feel like?", opts: [
    { v: "Silky", sym: "◇", grad: "linear-gradient(155deg,#9a7b4f,#f0dec8)", col: "#4a2800" },
    { v: "Earthy", sym: "◉", grad: "linear-gradient(155deg,#3a2a1a,#8b6040)", col: "#f0c890" },
    { v: "Crisp",  sym: "◈", grad: "linear-gradient(155deg,#1a5f3a,#7ab890)", col: "#c8f0d8" },
    { v: "Warm",   sym: "◆", grad: "linear-gradient(155deg,#6b2020,#d45050)", col: "#ffb8b8" },
  ]},
  { q: "How long should it last?", sub: "From first spray to final whisper", opts: [
    { v: "Light & Fleeting",  sym: "◌", grad: "linear-gradient(155deg,#8a8a9a,#c8c8d8)", col: "#f0f0f8" },
    { v: "All Day",           sym: "◎", grad: "linear-gradient(155deg,#3a5a8a,#7a9ab0)", col: "#d8e8f8" },
    { v: "Morning to Night",  sym: "◉", grad: "linear-gradient(155deg,#8b4513,#d4af37)", col: "#fff0a0" },
    { v: "Forever",           sym: "✦", grad: "linear-gradient(155deg,#1a0a2e,#8b1a1a,#d4af37)", col: "#ffd860" },
  ]},
]

// Full scoring map — covers all 75 perfume IDs across every quiz answer
const SCORES = {
  // Q1 — Mood
  Mysterious: {
    1:3, 5:3, 8:3, 25:2, 29:2, 31:2, 40:2, 43:2, 47:3, 49:2, 52:3, 53:2,
    56:3, 59:2, 61:3, 62:2, 71:3, 72:3, 73:2, 74:2,
  },
  Fresh: {
    3:3, 6:3, 9:3, 12:3, 13:2, 14:2, 17:3, 22:2, 30:2, 34:3, 37:2, 42:3,
    48:2, 51:3, 58:2, 60:2, 63:3, 64:2, 69:3,
  },
  Romantic: {
    4:3, 7:3, 10:3, 11:2, 18:3, 20:2, 21:2, 22:2, 23:2, 24:3, 26:3, 30:2,
    32:3, 33:3, 35:2, 36:2, 44:2, 45:3, 46:2, 50:2, 53:2, 55:2, 57:2, 65:3,
    66:2, 67:2, 70:2, 74:2,
  },
  Bold: {
    2:3, 13:2, 14:2, 15:3, 16:2, 19:2, 23:2, 25:2, 27:3, 28:3, 36:2, 37:2,
    38:3, 39:2, 40:2, 41:2, 43:2, 47:2, 49:2, 52:2, 54:3, 56:2, 62:3, 68:2,
    73:3, 75:2,
  },

  // Q2 — Season
  Spring: {
    7:3, 9:3, 18:3, 21:2, 22:2, 23:2, 24:2, 30:3, 32:2, 33:3, 35:2, 42:2,
    50:2, 51:2, 57:2, 63:3, 64:2, 65:3, 66:2, 70:3,
  },
  Summer: {
    3:3, 12:3, 17:3, 21:2, 34:3, 35:2, 37:2, 46:2, 51:2, 58:3, 60:2, 63:3,
    64:2, 69:3,
  },
  Autumn: {
    1:2, 2:3, 8:2, 16:2, 26:2, 27:3, 28:3, 29:3, 31:3, 36:2, 39:2, 40:2,
    41:2, 44:2, 45:2, 48:2, 54:2, 55:2, 59:3, 62:3, 67:2, 72:2, 73:3,
  },
  Winter: {
    5:3, 8:3, 11:2, 14:2, 15:2, 16:2, 19:2, 25:3, 38:3, 43:3, 47:3, 49:2,
    52:3, 54:2, 56:3, 61:3, 68:2, 71:3, 72:3, 73:2, 74:3, 75:2,
  },

  // Q3 — Weekend
  Beach: {
    3:3, 6:2, 12:3, 17:3, 21:2, 34:3, 37:3, 51:2, 58:3, 63:2, 64:2, 69:3,
  },
  Forest: {
    2:2, 14:2, 18:2, 28:3, 29:3, 30:2, 31:3, 42:3, 47:2, 48:3, 52:2, 60:3,
    62:3, 65:2, 70:2,
  },
  City: {
    6:2, 13:2, 14:3, 15:2, 16:3, 20:2, 22:2, 23:3, 24:2, 25:2, 27:2, 32:2,
    33:2, 36:2, 39:2, 40:2, 41:2, 45:2, 50:2, 51:2, 57:2, 64:3, 66:2, 68:3,
    75:3,
  },
  "Cosy Home": {
    4:2, 10:2, 11:3, 15:2, 19:3, 26:2, 38:2, 43:2, 49:3, 53:2, 54:3, 55:3,
    56:2, 59:3, 61:2, 67:3, 71:2, 72:3, 73:2, 74:3,
  },

  // Q4 — Texture
  Silky: {
    4:3, 7:3, 11:2, 18:2, 20:3, 24:2, 30:2, 32:3, 33:3, 45:2, 50:3, 53:2,
    65:2, 67:3, 74:2, 75:2,
  },
  Earthy: {
    1:2, 2:2, 28:3, 29:3, 31:3, 39:2, 47:3, 48:2, 52:3, 56:2, 59:2, 60:3,
    62:3, 72:3, 73:3,
  },
  Crisp: {
    3:3, 6:3, 9:2, 12:3, 13:2, 14:2, 17:3, 22:2, 34:3, 37:3, 42:3, 48:2,
    51:3, 58:2, 63:3, 64:3, 69:3,
  },
  Warm: {
    5:2, 8:2, 11:2, 15:2, 16:2, 19:3, 25:2, 26:2, 27:2, 38:3, 40:2, 41:2,
    43:3, 46:2, 49:3, 54:3, 55:3, 56:2, 59:2, 61:3, 66:2, 67:2, 68:2, 71:2,
    72:2, 73:3, 74:3,
  },

  // Q5 — Longevity
  "Light & Fleeting": {
    9:3, 12:3, 18:3, 21:3, 30:2, 34:3, 35:2, 51:3, 63:3, 69:3,
  },
  "All Day": {
    6:3, 13:2, 14:3, 15:2, 16:3, 20:2, 22:2, 23:2, 24:2, 26:2, 28:2, 32:2,
    33:2, 36:2, 37:2, 39:2, 40:2, 41:2, 42:2, 44:2, 45:2, 46:2, 50:2, 55:2,
    57:2, 60:2, 64:2, 65:2, 66:2, 67:2, 68:3, 70:2, 75:2,
  },
  "Morning to Night": {
    1:2, 4:3, 5:3, 7:2, 8:2, 10:3, 11:2, 19:2, 25:2, 27:3, 29:2, 33:3,
    38:2, 43:2, 47:2, 49:2, 52:2, 53:3, 54:2, 56:2, 59:2, 61:2, 67:2, 71:2,
    73:2, 74:2,
  },
  Forever: {
    2:3, 8:3, 28:2, 31:3, 47:3, 52:3, 56:2, 61:3, 62:3, 71:3, 72:3, 73:3,
  },
}

export function calcQuizResults(answers, perfumeList = PERFUMES) {
  const sc = {}
  perfumeList.forEach(p => { sc[p.id] = 0 })
  answers.filter(Boolean).forEach(v => {
    Object.entries(SCORES[v] || {}).forEach(([id, pt]) => {
      if (sc[+id] !== undefined) sc[+id] += pt
    })
  })
  // Return top 8 so UI can budget-filter without running out
  return [...perfumeList]
    .sort((a, b) => (sc[b.id] || 0) - (sc[a.id] || 0))
    .slice(0, 8)
}
