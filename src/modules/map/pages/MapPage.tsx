import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function MapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const positions = [
    [50.0647, 19.945],
    [50.0647, 19.942],
  ];

  console.log(coords);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCoords(coords),
      console.error,
    );
  }, []);

  if (coords === null) {
    return null;
  }

  return (
    <Box sx={{ m: -4 }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={coords ? [coords?.latitude, coords?.longitude] : [0, 0]}
        zoom={13}
        scrollWheelZoom
      >
        <Marker position={[50.0647, 19.945]}></Marker>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}
