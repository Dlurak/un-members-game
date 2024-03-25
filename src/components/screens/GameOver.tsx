import { Score } from "../../types";
import { Button } from "../Button";

interface GameOverScreenProps {
  scores: Record<string, Score>;
  startNewGame: () => void;
  gameStartTimestamp: number;
}

export default function GameOverScreen(props: GameOverScreenProps) {
  const durationSecs = Math.floor(
    (Date.now() - props.gameStartTimestamp) / 1000,
  );

  const minimumGuesses = Object.keys(props.scores).length;
  const neededGuesses = Object.values(props.scores)
    .map((s) => s.tries)
    .reduce((a, b) => a + b, 0);

  const percentage = Math.floor((minimumGuesses / neededGuesses) * 100);

  return (
    <div className="min-h-[100svh] flex justify-center items-center">
      <div className="w-[min(90%,32rem)] 100% flex flex-col justify-center">
        <h1 className="text-center mb-2 text-2xl">Game over!</h1>
        <h2 className="text-center mb-1 text-1xl">{percentage}%</h2>
        <span className="text-center my-2">
          It took you {durationSecs} seconds to finish the game
        </span>
        <Button onClick={props.startNewGame}>Start new game</Button>
      </div>
    </div>
  );
}
