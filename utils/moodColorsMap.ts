import { Mood } from "../context/LightingContext";

export const moodColorsMap: Record<Mood, [string, string]> = {
  lithium: ["#ffccd5", "#ff4d6d"], // crimson/pink
  sodium: ["#fff2b2", "#ffcc33"], // golden yellow
  potassium: ["#d8c2ff", "#9966ff"], // violet
  rubidium: ["#ffcce6", "#ff3399"], // reddish purple
  cesium: ["#ccf2ff", "#3399ff"], // sky blue
  calcium: ["#fff5cc", "#ffdd66"], // amber
  strontium: ["#ffd6cc", "#ff3300"], // bright red
  barium: ["#e6ffcc", "#66ff33"], // apple green
  copper: ["#ccffee", "#00ffaa"], // blue-green
  boron: ["#d9e6ff", "#3366ff"], // blue
  iron: ["#fff0cc", "#ff6600"], // orange
  manganese: ["#e6ccff", "#9933cc"], // lilac purple
  lead: ["#f2f2f2", "#cccccc"], // gray
  antimony: ["#f0f0f0", "#e6e6ff"], // pale blue-white
  arsenic: ["#ccffe6", "#33cc99"], // turquoise green
  phosphorus: ["#ffffe0", "#ffff66"], // yellow-white
  selenium: ["#ffcccc", "#ff3300"], // deep red
  thallium: ["#e6ffcc", "#66cc00"], // green
  indium: ["#d6e0ff", "#3366cc"], // blue-violet
  tungsten: ["#e0e0ff", "#9999ff"], // bluish white
};
