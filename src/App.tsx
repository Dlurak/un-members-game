import "./App.css";
import { Map } from "./components/Map";
import { QuestionBox } from "./components/QuestionBox";
import { useEffect, useState } from "react";
import { Country, getCountries } from "./utils/countries";
import { shuffle } from "./utils/arrays/random";
import { Score, Status } from "./types";



function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(shuffle(data));
    });
  }, []);

  const incrementScore = (country: string, status: Status, amount = 1) => {
    const countryScore = scores[country]?.tries || 0;
    const scoreCopy = { ...scores };
    scoreCopy[country] = {
		tries: countryScore + amount,
		status
	};
    setScores(scoreCopy);
  };

  if (!countries.length || !countries[0]?.name.common) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Map
        currentCountry={countries[0]?.name.common}
		scores={scores}
        onCorrect={() => {
          setCountries(countries.slice(1));
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
		onSkip={() =>{
			const [first, ...rest] = countries;	
			setCountries([...rest, first]);
			incrementScore(countries[0].name.common, "skipped", 0);
			console.log(scores)
		}}
		onPause={() =>{}}
      />
    </>
  );
}

export default App;
