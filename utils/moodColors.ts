import { Mood } from "../context/LightingContext";

// 👇 import the shared map
import { moodColorsMap } from "../utils/moodColorsMap";

export function getMoodColors(mood: Mood): [string, string] {
  return moodColorsMap[mood] ?? ["#ffecc7", "#ff9933"]; // fallback = warm
}
