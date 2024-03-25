import React from "react";
import { ComposableMap, Geographies, ZoomableGroup } from "react-simple-maps";
import { Score } from "../types";
import { MapFeature } from "./map/Geography";

interface WorldMapProps {
  currentCountry: string;
  scores: Record<string, Score>;
  onCorrect: () => void;
  onIncorrect: () => void;
}

export const Map: React.FC<WorldMapProps> = (props) => {
  return (
    <div
      style={{
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <ComposableMap>
        <ZoomableGroup>
          <Geographies geography="/features.json">
            {({ geographies }) =>
              geographies.map((geo) => (
                <MapFeature
                  geo={geo}
                  scores={props.scores}
                  onClick={(country) => {
					console.log(country)
                    if (country === props.currentCountry) props.onCorrect();
                    else props.onIncorrect();
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
