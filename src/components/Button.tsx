import * as React from "react";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={props.onClick}
      style={{
        paddingBlock: "0.5rem",
        paddingInline: "5rem",
        background: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(10px)",
        borderRadius: "100vmax",
        border: "none",
        outline: "2px solid #0284c7",
        cursor: "pointer",
      }}
    >
      {props.children}
    </button>
  );
};
