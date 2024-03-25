import "./App.css";
import { Map } from "./components/Map";
import { QuestionBox } from "./components/QuestionBox";
import { useEffect, useState } from "react";
import { Country, getCountries } from "./utils/countries";
import { shuffle } from "./utils/arrays/random";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [scores, setScores] = useState<Record<string, number>>({});

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(shuffle(data));

      for (const country of countries) {
        scores[country.name.common] = 0;
      }
    });
  }, []);

  const incrementScore = (country: string) => {
    const countryScore = scores[country] || 0;
    const scoreCopy = { ...scores };
    scoreCopy[country] = countryScore + 1;
    setScores(scoreCopy);
  };

  if (!countries.length || !countries[0]?.name.common) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Map
        currentCountry={countries[0]?.name.common}
        onCorrect={() => {
          window.alert("Correct!");
          setCountries(countries.slice(1));

          incrementScore(countries[0].name.common);
        }}
        onIncorrect={() => {
          window.alert("Incorrect!");

          incrementScore(countries[0].name.common);
        }}
      />
      <QuestionBox
        country={countries[0]?.name.common}
        capital={countries[0].capital[0]}
        flag={countries[0].flags.svg}
      />
    </>
  );
}

export default App;
