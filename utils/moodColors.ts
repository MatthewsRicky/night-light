import { Mood } from "../context/LightingContext";


export function getMoodColors(mood: Mood): [string, string] {
  switch (mood) {
    case "cool":
      return ["#cceeff", "#3366ff"];
    case "green":
      return ["#d0ffd0", "#00cc66"];
    case "purple":
      return ["#e0d0ff", "#9933ff"];
    case "pink":
      return ["#ffd6e7", "#ff69b4"];
    case "yellow":
      return ["#fffdd0", "#ffcc00"];
    case "warm":
    default:
      return ["#ffecc7", "#ff9933"];
  }
}
