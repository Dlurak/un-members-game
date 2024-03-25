import React from "react";
import { Annotation } from "react-simple-maps";
import { Geo } from "./Geography";
import { z } from "zod";

const coordSchema = z.tuple([z.number(), z.number()]);
type Coord = z.infer<typeof coordSchema>;
const oneDimCoordSchema = z.array(coordSchema);
type OneDimCoord = z.infer<typeof oneDimCoordSchema>;
const twoDimCoordSchema = z.array(oneDimCoordSchema);
type TwoDimCoord = z.infer<typeof twoDimCoordSchema>;
const threeDimCoordSchema = z.array(twoDimCoordSchema);
type ThreeDimCoord = z.infer<typeof threeDimCoordSchema>;

type Bounds = {
  top: number;
  left: number;
  bottom: number;
  right: number;
};

const processCoord = (coord: Coord): Bounds => {
  const [x, y] = coord;
  return { top: y, left: x, bottom: y, right: x };
};

const processOneDimCoord = (coord: OneDimCoord): Bounds => {
  const xses = coord.map(([x, _]) => x);
  const yses = coord.map(([_, y]) => y);
  return {
    top: Math.min(...yses),
    left: Math.min(...xses),
    bottom: Math.max(...yses),
    right: Math.max(...xses),
  };
};

const getSizeOfBound = (bound: Bounds): number => {
  const { top, left, bottom, right } = bound;
  const width = right - left;
  const height = bottom - top;
  return width * height;
};

const getBiggestBound = (bounds: Bounds[]): Bounds => {
  return bounds.reduce((biggest, current) => {
    return getSizeOfBound(current) > getSizeOfBound(biggest)
      ? current
      : biggest;
  });
};

const getBoundingBox = (
  coords: Coord | OneDimCoord | TwoDimCoord | ThreeDimCoord,
) => {
  const coord = coordSchema.safeParse(coords);
  if (coord.success) {
    return processCoord(coord.data);
  }

  const oneDimCoord = oneDimCoordSchema.safeParse(coords);
  if (oneDimCoord.success) {
    return processOneDimCoord(oneDimCoord.data);
  }

  const twoDimCoord = twoDimCoordSchema.safeParse(coords);
  if (twoDimCoord.success) {
    return getBiggestBound(twoDimCoord.data.map(processOneDimCoord));
  }

  const threeDimCoord = threeDimCoordSchema.safeParse(coords);
  if (threeDimCoord.success) {
    return getBiggestBound(
      threeDimCoord.data.map((coord) =>
        getBiggestBound(coord.map(processOneDimCoord)),
      ),
    );
  }

  throw new Error("Invalid coordinates");
};

const getCenter = (bound: Bounds): Coord => {
  const { top, left, bottom, right } = bound;
  return [(left + right) / 2, (top + bottom) / 2];
};

interface LabelProps {
  geo: Geo;
}

export const Label: React.FC<LabelProps> = ({ geo }) => {
  const boundingBox = getBoundingBox(geo.geometry.coordinates);
  const center = getCenter(boundingBox);
  const size = getSizeOfBound(boundingBox);
  const calculatedFontSize = Math.floor(Math.max(2, Math.log2(size + 1)));

  return (
      <Annotation subject={center} dx={0} dy={0} connectorProps={{}}>
        <>
          <text
            x={0}
            y={0}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize={calculatedFontSize}
            fill="#000"
			pointerEvents="none"
          >
            {geo.properties.name}
          </text>
        </>
      </Annotation>
  );
};
