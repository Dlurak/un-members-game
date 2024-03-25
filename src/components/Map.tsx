import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { z } from "zod";
import { Score } from "../types";
import { DEFAULT_BG_COLOR, getBackgroundColor } from "../utils/colors/score";
import { darken } from "../utils/colors/darken";

const geoSchema = z.object({
  properties: z.object({
    name: z.string(),
  }),
});

interface WorldMapProps {
  currentCountry: string;
  scores: Record<string, Score>;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export const Map: React.FC<WorldMapProps> = (props) => {
  const getScore = (countryName: string) =>
    props.scores[countryName] as Score | null;

  const getBgColor = (countryName: string) => {
    const score = getScore(countryName);

	return score ? getBackgroundColor(score) : DEFAULT_BG_COLOR;
  };

  const getCursor = (countryName: string) => {
    const score = props.scores[countryName];
    if (!score) return "pointer";

    if (score.status === "solved") return "not-allowed";
  };

  const getName = (geo: any) => geoSchema.parse(geo).properties.name;

  return (
    <div
      style={{
        maxHeight: "100vh",
        outline: "1px solid red",
        overflow: "hidden",
      }}
    >
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onClick={() => {
					const score = getScore(getName(geo))?.status
					if (score === "solved") return;

                    if (getName(geo) === props.currentCountry) {
                      props.onCorrect();
                    } else {
                      props.onIncorrect();
                    }
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
              ))
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
};
