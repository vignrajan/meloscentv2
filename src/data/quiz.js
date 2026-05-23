import { PERFUMES } from './perfumes'

export const QUIZ_QS = [
  { q: "Pick a mood", sub: "How do you want to feel when you wear it?", opts: [
    { v: "Mysterious", sym: "◈", grad: "linear-gradient(155deg,#1a0a2e,#6b2d7a)", col: "#d8a8ff" },
    { v: "Fresh", sym: "◉", grad: "linear-gradient(155deg,#1a5f7a,#8fccd8)", col: "#b8f0f8" },
    { v: "Romantic", sym: "✿", grad: "linear-gradient(155deg,#7a2a4a,#e8a8b8)", col: "#ffd8e8" },
    { v: "Bold", sym: "◆", grad: "linear-gradient(155deg,#3a1a0a,#a84020)", col: "#ffb888" },
  ]},
  { q: "Choose a season", sub: "When will you reach for this most?", opts: [
    { v: "Spring", sym: "✿", grad: "linear-gradient(155deg,#1a5a2a,#7ab87a)", col: "#c8f0a8" },
    { v: "Summer", sym: "✦", grad: "linear-gradient(155deg,#8b6020,#e8c050)", col: "#fff0b0" },
    { v: "Autumn", sym: "◈", grad: "linear-gradient(155deg,#6b4020,#c4843a)", col: "#ffe0b0" },
    { v: "Winter", sym: "❄", grad: "linear-gradient(155deg,#1a2a4a,#4a7ab0)", col: "#b8d8f0" },
  ]},
  { q: "Your ideal weekend", sub: "Where does your imagination take you?", opts: [
    { v: "Beach", sym: "∿", grad: "linear-gradient(155deg,#1a5f7a,#2d9bb0)", col: "#b8e8f0" },
    { v: "Forest", sym: "◈", grad: "linear-gradient(155deg,#1c3a1c,#4a7a3a)", col: "#a8d898" },
    { v: "City", sym: "◆", grad: "linear-gradient(155deg,#1a1a2e,#4a4a7a)", col: "#c8c8f0" },
    { v: "Cosy Home", sym: "♥", grad: "linear-gradient(155deg,#6b3a1a,#c4843a)", col: "#ffe0b0" },
  ]},
  { q: "Pick a texture", sub: "What does your perfect scent feel like?", opts: [
    { v: "Silky", sym: "◇", grad: "linear-gradient(155deg,#9a7b4f,#f0dec8)", col: "#4a2800" },
    { v: "Earthy", sym: "◉", grad: "linear-gradient(155deg,#3a2a1a,#8b6040)", col: "#f0c890" },
    { v: "Crisp", sym: "◈", grad: "linear-gradient(155deg,#1a5f3a,#7ab890)", col: "#c8f0d8" },
    { v: "Warm", sym: "◆", grad: "linear-gradient(155deg,#6b2020,#d45050)", col: "#ffb8b8" },
  ]},
  { q: "How long should it last?", sub: "From first spray to final whisper", opts: [
    { v: "Light & Fleeting", sym: "◌", grad: "linear-gradient(155deg,#8a8a9a,#c8c8d8)", col: "#f0f0f8" },
    { v: "All Day", sym: "◎", grad: "linear-gradient(155deg,#3a5a8a,#7a9ab0)", col: "#d8e8f8" },
    { v: "Morning to Night", sym: "◉", grad: "linear-gradient(155deg,#8b4513,#d4af37)", col: "#fff0a0" },
    { v: "Forever", sym: "✦", grad: "linear-gradient(155deg,#1a0a2e,#8b1a1a,#d4af37)", col: "#ffd860" },
  ]},
]

const SCORES = {
  Mysterious: { 1: 3, 5: 3, 8: 3, 2: 1 }, Fresh: { 3: 3, 6: 3, 9: 3 },
  Romantic: { 4: 3, 7: 3, 10: 3, 11: 2 }, Bold: { 2: 3, 6: 2, 1: 2 },
  Spring: { 9: 3, 7: 3, 10: 2, 4: 1 }, Summer: { 3: 3, 6: 3, 9: 2 },
  Autumn: { 8: 3, 1: 3, 5: 2, 2: 1 }, Winter: { 5: 3, 8: 3, 1: 2, 2: 2 },
  Beach: { 3: 3, 9: 2, 6: 2 }, Forest: { 2: 3, 1: 2, 8: 2 },
  City: { 5: 3, 1: 2, 4: 2 }, "Cosy Home": { 11: 3, 10: 3, 5: 2, 4: 1 },
  Silky: { 4: 3, 7: 3, 10: 2 }, Earthy: { 2: 3, 1: 2, 8: 3 },
  Crisp: { 3: 3, 6: 3, 9: 2 }, Warm: { 5: 3, 11: 3, 8: 2 },
  "Light & Fleeting": { 3: 3, 9: 2, 7: 1 }, "All Day": { 6: 3, 7: 2, 10: 2 },
  "Morning to Night": { 4: 3, 2: 2, 11: 2 }, Forever: { 8: 3, 1: 3, 5: 2 },
}

export function calcQuizResults(answers) {
  const sc = {}
  PERFUMES.forEach(p => { sc[p.id] = 0 })
  answers.filter(Boolean).forEach(v => {
    Object.entries(SCORES[v] || {}).forEach(([id, pt]) => {
      sc[+id] = (sc[+id] || 0) + pt
    })
  })
  return [...PERFUMES].sort((a, b) => (sc[b.id] || 0) - (sc[a.id] || 0)).slice(0, 3)
}
