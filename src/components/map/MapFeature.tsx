import React from "react";
import { Score } from "../../types";
import { Geo, InnerMapFeature, geoSchema } from "./Geography";
import { Label } from "./Label";
import { z } from "zod";

interface MapFeature {
  geo: Geo;
  scores: Record<string, Score>;
  onClick: (country: string) => void;
}

export const MapFeature: React.FC<MapFeature> = ({ geo, scores, onClick }) => {
  const [score, setScore] = React.useState<Score | null>(null);
  const [isSolved, setIsSolved] = React.useState(false);

  React.useEffect(() => {
    setScore(scores[geo.properties.name] || null);
    setIsSolved(score?.status === "solved");
  }, [geo.properties.name, scores]);

  return (
    <>
      <InnerMapFeature geo={geo} scores={scores} onClick={onClick} />
      {/* Move the Label component After **all** countries */}
      {isSolved && <Label geo={geo} />}
    </>
  );
};

interface GeographiesProps {
  geographies: any[];
  scores: Record<string, Score>;
  onClick: (country: string) => void;
}

export const ManyMapFeatures: React.FC<GeographiesProps> = ({
  geographies,
  scores,
  onClick,
}) => {
  const parsedGeographies = z.array(geoSchema).parse(geographies);

  return (
    <>
      {parsedGeographies.map((geo) => (
        <MapFeature geo={geo} scores={scores} onClick={onClick} key={geo.rsmKey} />
      ))}
    </>
  );
};
