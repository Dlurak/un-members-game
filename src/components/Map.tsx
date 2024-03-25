import React, { useEffect } from "react";
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
  const [height, setHeight] = React.useState(window.innerHeight);
  const [width, setWidth] = React.useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => {
			setHeight(window.innerHeight);
			setWidth(window.innerWidth);
		}
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, [])

  return (
    <div
      style={{
        height: "100svh",
		width: "100%",
        overflow: "hidden",
      }}
    >
      <ComposableMap
		  width={width}
		  height={height}
	  >
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
