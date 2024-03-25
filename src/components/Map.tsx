import React, { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  ZoomableGroup,
} from "react-simple-maps";
import { z } from "zod";

const geoSchema = z.object({
  properties: z.object({
    name: z.string(),
  }),
});

interface WorldMapProps {
  currentCountry: string;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export const Map: React.FC<WorldMapProps> = (props) => {
  const [defaultBgColor, setDefaultBgColor] = useState("#D6D6DA");
  const [hoverBgColor, setHoverBgColor] = useState("#a3a3a6");
  const [hoverCursor, setHoverCursor] = useState("pointer");

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
                    const name = geoSchema.parse(geo).properties.name;

                    if (name === props.currentCountry) {
                      props.onCorrect();
                    } else {
						props.onIncorrect();
					}
                  }}
                  style={{
                    default: { fill: defaultBgColor, stroke: "#000", strokeWidth: 0.1 },
                    hover: { fill: hoverBgColor, cursor: hoverCursor },
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
