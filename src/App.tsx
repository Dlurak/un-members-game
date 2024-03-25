import "./App.css";
import { Map } from "./components/Map";
import { QuestionBox } from "./components/QuestionBox";
import { useEffect, useState } from "react";
import { Country, getCountries } from "./utils/countries";
import { shuffle } from "./utils/arrays/random";

function App() {
  const [countries, setCountries] = useState<Country[]>([]);
	

  useEffect(() => {
    getCountries().then((data) => {
      setCountries(shuffle(data));
    });
  }, []);

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
		}}
		onIncorrect={() => {
		  window.alert("Incorrect!");
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
