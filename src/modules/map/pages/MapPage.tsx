import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Box } from "@mui/material";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Coords, useMapSwitcherContext } from "../../common/context/MapSwitcher";

export default function MapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);

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
        style={{ height: "calc(100vh - 50px)" }}
        center={coords ? [coords?.latitude, coords?.longitude] : [0, 0]}
        zoom={13}
        scrollWheelZoom
      >
        <MapElements />
        <>
          {[
            { coords: [50.0647, 19.945], message: "Podzielę się! 3 porcje gulaszu do oddania :)" },
          ].map(({ coords, message }) => (
            <Marker key={coords.toString()} position={coords as any}>
              <Popup>
                <span>{message}</span>
              </Popup>
            </Marker>
          ))}
        </>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}

function MapElements() {
  const map = useMap();
  const { setCoords } = useMapSwitcherContext();

  useMapEvents({
    zoom: () => setCoords(map.getBounds() as unknown as Coords),
    move: () => setCoords(map.getBounds() as unknown as Coords),
  });

  return null;
}
