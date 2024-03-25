import convert from "color-convert";

export function darken(color: string, amount: number): string {
  const hsl = convert.hex.hsl(color);
	console.log(hsl)
  hsl[2] = Math.max(0, hsl[2] - amount);

  const result = convert.hsl.hex(hsl);

	console.log(result, color);

  return `#${result}`;
}
