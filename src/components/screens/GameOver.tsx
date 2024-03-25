interface GameOverScreenProps {
  startNewGame: () => void;
  gameStartTimestamp: number;
}

export default function GameOverScreen(props: GameOverScreenProps) {
	const durationSecs = Math.floor((Date.now() - props.gameStartTimestamp) / 1000);

	return (
		<div>
			<h1>Game over!</h1>
			<p>It took you {durationSecs} seconds to finish the game</p>
			<button onClick={props.startNewGame}>Start new game</button>
		</div>
	);
}
