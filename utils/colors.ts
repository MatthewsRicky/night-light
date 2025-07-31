export function getHueColors(family: string): [string, string] {
  switch (family) {
    case "cool":
      return ["#cceeff", "#3366ff"]; // soft blue → deep blue
    case "green":
      return ["#d0ffd0", "#00cc66"]; // mint → emerald
    case "purple":
      return ["#e0d0ff", "#9933ff"]; // lavender → violet
    case "pink":
      return ["#ffd6e7", "#ff69b4"]; // rose → hot pink
    case "yellow":
      return ["#fffdd0", "#ffcc00"]; // pale yellow → gold
    case "warm":
    default:
      return ["#ffecc7", "#ff9933"]; // soft amber → warm orange
  }
}
