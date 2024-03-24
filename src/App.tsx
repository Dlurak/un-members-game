import "leaflet/dist/leaflet.css";
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

  return (
    <>
      <Map onClick={(country) => {
		const currentName = countries[0].name.common;
		const correct = currentName === country;
		if (correct) {
			setCountries(countries.slice(1));
		} else {
			window.alert("Not implemented yet");
		}
	  }} />
      {countries[0] && (
        <QuestionBox
          flag={countries[0].flags.svg}
          country={countries[0].name.common}
          capital={countries[0].capital[0]}
        />
      )}
    </>
  );
}

export default App;
