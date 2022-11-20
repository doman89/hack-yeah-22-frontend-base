import { createContext, ReactNode, useContext, useState } from "react";

type MapSwitcherContext = {
  isMapActive: boolean;
  toggleMap: (state?: boolean) => void;
};

type MApSwitcherProviderProps = {
  children: ReactNode;
};

const MapSwitcherCtx = createContext<MapSwitcherContext | null>(null);

export function MapSwitcherProvider({ children }: MApSwitcherProviderProps) {
  const [isMapActive, setIsMapActive] = useState(false);

  const toggleMap = (state?: boolean) => {
    setIsMapActive(prev => state ?? !prev);
  };

  return (
    <MapSwitcherCtx.Provider value={{ isMapActive, toggleMap }}>{children}</MapSwitcherCtx.Provider>
  );
}

export function useMapSwitcherContext() {
  const data = useContext(MapSwitcherCtx);

  if (!data) {
    throw new Error("useMapSwitcherContext hook should be wrapped by MapSwitcherProvider");
  }

  return data;
}
