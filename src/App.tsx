import "./App.css";
import { Map } from "./components/Map";
import { QuestionBox } from "./components/QuestionBox";
import { useEffect, useState } from "react";
import { Country, getCountries } from "./utils/countries";
import { shuffle } from "./utils/arrays/random";
import { Score, Status } from "./types";
import LoadingScreen from "./components/screens/Loading";
import GameOverScreen from "./components/screens/GameOver";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [startTimestamp, setStartTimestamp] = useState<number | null>(null);
  const [status, setStatus] = useState<"loading" | "playing" | "finished">(
    "loading",
  );

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(shuffle(data));
      setStatus("playing");
    });
  }, []);

  useEffect(() => {
    if (!startTimestamp) setStartTimestamp(Date.now());
  }, [scores, countries]);

  const incrementScore = (country: string, status: Status, amount = 1) => {
    const countryScore = scores[country]?.tries || 0;
    const scoreCopy = { ...scores };
    scoreCopy[country] = {
      tries: countryScore + amount,
      status,
    };
    setScores(scoreCopy);
  };

  if (status === "loading") return <LoadingScreen />;
  if (status === "finished") {
    return (
      <GameOverScreen
        startNewGame={() => {
          setStatus("loading");
          getCountries().then((data) => {
            setScores({});
            setStartTimestamp(Date.now());
            setCountries(shuffle(data));
            setStatus("playing");
          });
        }}
		scores={scores}
        gameStartTimestamp={startTimestamp!}
      />
    );
  }

  return (
    <>
      <Map
        currentCountry={countries[0]?.name.common}
        scores={scores}
        onCorrect={() => {
          const newCountries = countries.slice(1);
          if (newCountries.length === 0) setStatus("finished");
          setCountries(newCountries);
          incrementScore(countries[0].name.common, "solved");
        }}
        onIncorrect={() => {
          incrementScore(countries[0].name.common, "active");
        }}
      />
      <QuestionBox
        country={countries[0]?.name.common}
        capital={countries[0].capital[0]}
        flag={countries[0].flags.svg}
		startTimestamp={startTimestamp!}
        onSkip={() => {
          const [first, ...rest] = countries;
          setCountries([...rest, first]);
          incrementScore(countries[0].name.common, "skipped", 0);
        }}
      />
    </>
  );
}

export default App;
