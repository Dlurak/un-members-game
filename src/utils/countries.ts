import { z } from "zod";

const countrySchema = z.object({
	flags: z.object({
		svg: z.string(),
		png: z.string(),
		alt: z.string(),
	}),
	name: z.object({
		common: z.string(),
		official: z.string(),
	}),
	capital: z.array(z.string()),
});

export type Country = z.infer<typeof countrySchema>;

const responseSchema = z.array(countrySchema);

export async function getCountries() {
  const data = await fetch(
    "https://restcountries.com/v3.1/independent?status=true&fields=name,flags,capital",
  ).then((r) => r.json());

  return responseSchema.parse(data)
		.filter(c => ["Italy", "San Marino", "Germany"].includes(c.name.common));
}
