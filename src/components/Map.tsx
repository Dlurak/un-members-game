import "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import { getCountry } from "../utils/coordinates/getCountry";

interface MapProps {
  onClick: (country: string) => void;
}

const MapHandler: React.FC<MapProps> = ({ onClick }) => {
  useMapEvents({
    click: (e) => {
      getCountry(e.latlng)
        .then(onClick)
        .catch(() => {});
    },
  });

  return null;
};

export const Map: React.FC<MapProps> = ({ onClick }) => (
  <MapContainer center={[0, 0]} zoom={2} maxZoom={7}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />

    <MapHandler onClick={onClick} />
  </MapContainer>
);
