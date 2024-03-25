import convert from "color-convert";

export function darken(color: string, amount: number): string {
  const hsl = convert.hex.hsl(color);
  hsl[2] = Math.max(0, hsl[2] - amount);

  const result = convert.hsl.hex(hsl);

  return `#${result}`;
}
