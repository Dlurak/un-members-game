import type { LatLng } from "leaflet";
import { z } from "zod";

const responseSchema = z.object({
  address: z.object({
    country: z.string(),
    country_code: z.string(),
  }),
});

/**
 * Get the country of a given set of coordinates
 * @param coords - The coordinates to get the country of
 * @returns The country of the given coordinates
 * @example
 * const country = await getCountry({ lat: 50, lng: 50 })
 */
export async function getCountry(coords: LatLng) {
  const { lat, lng } = coords;
  const data = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    {
      headers: {
        "User-Agent":
          "learn-un-unofficial (https://github.com/Dlurak/learn-un)",
      },
    },
  ).then((r) => r.json());
  const response = responseSchema.parse(data);
  return response.address.country;
}
