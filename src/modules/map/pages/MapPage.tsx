import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { Box, Button } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { Coords, useMapSwitcherContext } from "../../common/context/MapSwitcher";
import { useGetAdvertisementsQuery } from "../../advertisement/api/advertisements";
import { Link, useNavigate } from "react-router-dom";
import { Header } from "../../common/components/Header/Header";
import { useSelector } from "react-redux";
import { RootState } from "../../common/store";
import _ from "lodash";
import { Zapierdalacz } from "../../common/components/Zapierdalacz/Zapierdalacz";

export default function MapPage() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>(null);
  const { isMapActive, coords: visibleCoords } = useMapSwitcherContext();
  const { data } = useGetAdvertisementsQuery(
    {
      latLt: visibleCoords._northEast.lat.toString(),
      latGt: visibleCoords._southWest.lat.toString(),
      lngLt: visibleCoords._northEast.lng.toString(),
      lngGt: visibleCoords._southWest.lng.toString(),
      page: 1,
    },
    {
      skip:
        !visibleCoords._northEast.lat &&
        !visibleCoords._southWest.lat &&
        !visibleCoords._northEast.lng &&
        !visibleCoords._southWest.lng,
    },
  );
  const navigate = useNavigate();
  const bearerToken = useSelector((state: RootState) => state.authReducer.authUser.token);

  useEffect(() => {
    if (!bearerToken) {
      navigate("/login");
    }
  }, [bearerToken]);

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      ({ coords }) => setCoords(coords),
      console.error,
    );
  }, []);

  if (coords === null) {
    return <Zapierdalacz/>;
  }

  if (!isMapActive) {
    return <Preview />;
  }

  return (
    <Box sx={{ m: -4 }}>
      <MapContainer
        style={{ height: "calc(100vh - 50px)" }}
        center={[coords.latitude, coords.longitude]}
        zoom={13}
        scrollWheelZoom
      >
        <MapElements />
        <>
          {data
            ? data.map(data => (
                <Marker key={data.id} position={[data.lat, data.lng] as [number, number]}>
                  <Popup maxWidth={600}>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      <span>{data.description}</span>
                      <Button component={Link} to={`/advertisements/${data.id}`}>
                        Id?? do szczeg??????w
                      </Button>
                    </Box>
                  </Popup>
                </Marker>
              ))
            : null}
        </>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
      </MapContainer>
    </Box>
  );
}

function Preview() {
  const { coords } = useMapSwitcherContext();
  const { data, isLoading } = useGetAdvertisementsQuery({
    latLt: coords._northEast.lat.toString(),
    latGt: coords._southWest.lat.toString(),
    lngLt: coords._northEast.lng.toString(),
    lngGt: coords._southWest.lng.toString(),
    page: 1,
  });

  if (!data || isLoading) {
      return <Zapierdalacz/>;
  }

  return (
    <Box
      sx={{
        padding: 3,
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ul>
        {data.map(function (element) {
          return (
            <li key={element.id}>
              <Link to={`/advertisements/${element.id}`}>
                  <h2 style={{padding: "6px 6px 3px 3px", fontSize: "15px", margin: "10px 0 2px 0"}}>{element.description}</h2>
              </Link>
              {element.food.map(function (food) {
                return (
                  <div
                    style={{
                      display: "flex",
                      borderBottom: "solid 1px #cccccc",
                      padding: "10px 2px 5px 5px",
                    }}
                  >
                    <img src={food.image} style={{ maxWidth: 50 }} width={"100%"} />
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        padding: "5px 0px 2px 3px",
                        borderLeft: "solid 1px #cccccc",
                      }}
                    >
                      <h2>{food.name}</h2>
                      <p>{food.description}</p>
                      <small style={{color: food.available ? '#27c41e' : '#855252'}}>{food.available ? "Dost??pne" : "Niedost??pne"}</small>
                    </div>
                  </div>
                );
              })}
            </li>
          );
        })}
      </ul>
    </Box>
  );
}

function MapElements() {
  const map = useMap();
  const { setCoords } = useMapSwitcherContext();
  const setNewPosition = useMemo(() => {
      const fn = () => setCoords(map.getBounds() as unknown as Coords);
      return _.debounce(fn, 1000)
  }, []);
  useEffect(() => {
      setNewPosition();
  }, []);

  useMapEvents({
    zoom: setNewPosition,
    move: setNewPosition,
  });

  return null;
}
