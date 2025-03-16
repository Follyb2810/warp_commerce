import { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

interface MapSelectorProps {
    onLocationSelect: (lat: number, lng: number) => void;
}

function LocationPicker({ onLocationSelect }: MapSelectorProps) {
    useMapEvents({
        click: (e) => {
            onLocationSelect(e.latlng.lat, e.latlng.lng);
        }
    });
    return null;
}
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

export default function MapComponent({ onLocationSelect }: MapSelectorProps) {
    const [position, setPosition] = useState<[number, number] | null>(null);

    return (
        <MapContainer center={[51.505, -0.09]} zoom={13} style={{ height: "400px", width: "100%" }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {position && <Marker position={position}  icon={defaultIcon} />}
            <LocationPicker onLocationSelect={(lat, lng) => {
                setPosition([lat, lng]);
                onLocationSelect(lat, lng);
            }} />
        </MapContainer>
    );
}
