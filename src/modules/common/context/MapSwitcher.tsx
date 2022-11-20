import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react";

type MapSwitcherContext = {
  coords: Coords;
  setCoords: Dispatch<SetStateAction<Coords>>;
  isMapActive: boolean;
  toggleMap: (state?: boolean) => void;
};

type MApSwitcherProviderProps = {
  children: ReactNode;
};

type Coord = {
  lat: number;
  lng: number;
};

export type Coords = {
  _southWest: Coord;
  _northEast: Coord;
};

const MapSwitcherCtx = createContext<MapSwitcherContext | null>(null);

export function MapSwitcherProvider({ children }: MApSwitcherProviderProps) {
  const [isMapActive, setIsMapActive] = useState(true);
  const [coords, setCoords] = useState<Coords>({
    _northEast: { lat: 0, lng: 0 },
    _southWest: { lat: 0, lng: 0 },
  });

  const toggleMap = (state?: boolean) => {
    setIsMapActive(prev => state ?? !prev);
  };

  return (
    <MapSwitcherCtx.Provider value={{ coords, isMapActive, setCoords, toggleMap }}>
      {children}
    </MapSwitcherCtx.Provider>
  );
}

export function useMapSwitcherContext() {
  const data = useContext(MapSwitcherCtx);

  if (!data) {
    throw new Error("useMapSwitcherContext hook should be wrapped by MapSwitcherProvider");
  }

  return data;
}
