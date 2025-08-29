// utils/colorUtils.ts
function hexToRgb(hex: string): [number, number, number] {
  const c = hex.replace("#", "");
  const bigint = parseInt(c, 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
}

function luminance(r: number, g: number, b: number): number {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
}

function contrastRatio(hex1: string, hex2: string): number {
  const [r1, g1, b1] = hexToRgb(hex1);
  const [r2, g2, b2] = hexToRgb(hex2);
  const l1 = luminance(r1, g1, b1);
  const l2 = luminance(r2, g2, b2);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
}

export function getContrastingColor(
  background: string,
  fallback?: string
): string {
  const white = "#FFFFFF";
  const black = "#000000";

  const contrastWithWhite = contrastRatio(background, white);
  const contrastWithBlack = contrastRatio(background, black);

  // WCAG recommends at least 4.5:1 for normal text
  if (contrastWithWhite >= 4.5) return white;
  if (contrastWithBlack >= 4.5) return black;

  // If both are poor, pick whichever is higher contrast
  if (contrastWithWhite > contrastWithBlack) return white;
  if (contrastWithBlack > contrastWithWhite) return black;

  // Optional fallback tint if provided
  return fallback || black;
}
