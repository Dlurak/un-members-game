import React from "react";
import { Score } from "../../types";
import { DEFAULT_BG_COLOR, getBackgroundColor } from "../../utils/colors/score";
import { Geography, Marker } from "react-simple-maps";
import { z } from "zod";
import { darken } from "../../utils/colors/darken";

const coordSchema = z.tuple([z.number(), z.number()]);
const polygonCoords = z.array(
  z.array(
    z.union([coordSchema, z.array(coordSchema), z.array(z.array(coordSchema))]),
  ),
);
const pointCoords = coordSchema;

const pointSchema = z.object({
  type: z.literal("Point"),
  coordinates: pointCoords,
});
const polygonSchema = z.object({
  type: z.union([z.literal("Polygon"), z.literal("MultiPolygon")]),
  coordinates: polygonCoords,
});

const geoSchema = z.object({
  properties: z.object({
    name: z.string(),
  }),
  geometry: z.union([pointSchema, polygonSchema]),
  rsmKey: z.string(),
  svgPath: z.string(),
});

type Geo = z.infer<typeof geoSchema>;
type MapFeatureBase<T> = {
  geo: T;
  scores: Record<string, Score>;
  onClick: (country: string) => void;
};

type MapFeature = MapFeatureBase<any>;
type MapPartFeature = MapFeatureBase<Geo>;

const Polygon: React.FC<MapPartFeature> = ({ geo, scores, onClick }) => {
  const getScore = (countryName: string) => scores[countryName] as Score | null;

  const getBgColor = (countryName: string) => {
    const score = getScore(countryName);

    return score ? getBackgroundColor(score) : DEFAULT_BG_COLOR;
  };

  const getCursor = (countryName: string) => {
    const score = getScore(countryName);
    if (!score) return "pointer";

    if (score.status === "solved") return "not-allowed";
  };

  const getName = (geo: Geo) => geo.properties.name;

  return (
    <Geography
      key={geo.rsmKey}
      geography={geo}
      onClick={() => {
        const score = getScore(getName(geo))?.status;
        if (score === "solved") return;

        onClick(getName(geo));
      }}
      style={{
        default: {
          fill: getBgColor(getName(geo)),
          stroke: "#000",
          strokeWidth: 0.1,
        },
        hover: {
          fill: darken(getBgColor(getName(geo)), 15),
          stroke: "#000",
          strokeWidth: 0.1,
          cursor: getCursor(getName(geo)),
        },
      }}
    />
  );
};

const Point: React.FC<MapPartFeature> = ({ geo, scores, onClick }) => {
  const [isHovered, setIsHovered] = React.useState(false);

  const getScore = (countryName: string) => scores[countryName] as Score | null;

  const getBgColor = (countryName: string) => {
    const score = getScore(countryName);

    return score ? getBackgroundColor(score) : DEFAULT_BG_COLOR;
  };

  const parsedGeometry = pointSchema.parse(geo.geometry);

  return (
    <Marker
      coordinates={parsedGeometry.coordinates}
      onClick={() => {
        onClick(geo.properties.name);
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <circle
        r={1.5}
        fill={darken(getBgColor(geo.properties.name), isHovered ? 15 : 0)}
        stroke="#000"
        strokeWidth="0.1"
      />
    </Marker>
  );
};

export const MapFeature: React.FC<MapFeature> = ({ geo, scores, onClick }) => {
  const geoParsed = geoSchema.parse(geo);

  switch (geoParsed.geometry.type) {
    case "Point":
      return <Point geo={geo} scores={scores} onClick={onClick} />;
    case "MultiPolygon":
    case "Polygon":
      return <Polygon geo={geo} scores={scores} onClick={onClick} />;
  }
};
