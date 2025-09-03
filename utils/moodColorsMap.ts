import { Mood } from "../context/LightingContext";

export const moodColorsMap: Record<Mood, [string, string]> = {
  lithium: ["#ffccd5", "#ff4d6d"], // crimson/pink

  potassium: ["#d8c2ff", "#9966ff"], // violet
  rubidium: ["#ffcce6", "#ff3399"], // reddish purple
  cesium: ["#ccf2ff", "#3399ff"], // sky blue

  strontium: ["#ffd6cc", "#ff3300"], // bright red
  barium: ["#e6ffcc", "#66ff33"], // apple green
  copper: ["#ccffee", "#00ffaa"], // blue-green
  boron: ["#d9e6ff", "#3366ff"], // blue
  iron: ["#fff0cc", "#ff6600"], // orange
  manganese: ["#e6ccff", "#9933cc"], // lilac purple
  lead: ["#f2f2f2", "#cccccc"], // gray

  arsenic: ["#ccffe6", "#33cc99"], // turquoise green

  selenium: ["#ffcccc", "#ff3300"], // deep red
  thallium: ["#e6ffcc", "#66cc00"], // green
  indium: ["#d6e0ff", "#3366cc"], // blue-violet
  tungsten: ["#e0e0ff", "#9999ff"], // bluish white
};
