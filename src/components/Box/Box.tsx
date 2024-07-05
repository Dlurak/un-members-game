import React from "react";

interface BoxProps {
  children: React.ReactNode;
}

export const Box: React.FC<BoxProps> = (props) => (
  <div
    className="absolute rounded-lg bottom-12 left-1/2 -translate-x-1/2 w-11/12
	flex flex-col md:flex-row gap-2 backdrop-blur-md"
    style={{
      background: "rgba(255, 255, 255, 0.5)",

      justifyContent: "space-evenly",
      alignItems: "center",
      paddingBlock: "2rem",
      paddingInline: "2rem",
      outline: "1px solid #a1a1aa",
    }}
  >
    {props.children}
  </div>
);
