import 'react'
import { MapContainer, TileLayer } from 'react-leaflet'

export const Map = () => (
	<MapContainer center={[0, 0]} zoom={2} maxZoom={7}>
	  <TileLayer
		attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
	  />
	</MapContainer>	
)
