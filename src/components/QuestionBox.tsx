import React from "react";
import { Button } from "./Button";
import { Time } from "./Time";
import { Information } from "./Box/Information";
import { Box } from "./Box/Box";

interface QuestionBoxProps {
  flag: string;
  country: string;
  capital: string;

  startTimestamp: number;

  onSkip: () => void;
}

export const QuestionBox: React.FC<QuestionBoxProps> = (props) => {
  return (
    <Box>
      <Information
        flag={props.flag}
        country={props.country}
        capital={props.capital}
      />

      <span className="w-full flex justify-evenly items-center gap-2">
        <Button onClick={props.onSkip}>Skip</Button>
        <Time startTimestamp={props.startTimestamp} />
      </span>
    </Box>
  );
};
