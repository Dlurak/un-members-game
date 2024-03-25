import React from "react";
import { useStopwatch } from "../hooks/time";

interface TimeProps {
  startTimestamp: number;
}

export const Time: React.FC<TimeProps> = (props) => {
  const duration = useStopwatch(props.startTimestamp);
  const [hours, setHours] = React.useState(0);
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    setHours(Math.floor(duration / 1000 / 60 / 60));
    setMinutes(Math.floor(duration / 1000 / 60) % 60);
    setSeconds(Math.floor(duration / 1000) % 60);
  }, [duration]);

  return (
    <span>
      {hours ? `${hours}:` : ""}
      {minutes.toString().padStart(2, "0")}:
      {seconds.toString().padStart(2, "0")}
    </span>
  );
};
