import 'react'
import 'leaflet/dist/leaflet.css'
import './App.css'
import { Map } from './components/Map'
import { QuestionBox } from './components/QuestionBox'

function App() {
  return (
	<>
		<Map onClick={(country) => window.alert(country)} />
		<QuestionBox flag="https://flagcdn.com/de.svg" country="Germany" capital="Berlin" />
	</>
  ) 
}

export default App
