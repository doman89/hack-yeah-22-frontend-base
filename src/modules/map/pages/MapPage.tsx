import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";

export default function MapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
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
    <Box sx={{ maxWidth: "100%", width: "100%", maxHeight: "100%", height: "100vh" }}>
      <MapContainer
        style={{ height: "100vh" }}
        center={coords ? [coords?.latitude, coords?.longitude] : [0, 0]}
        zoom={13}
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}
