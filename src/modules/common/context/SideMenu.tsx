import { createContext, ReactNode, useContext, useState } from "react";

type SideMenuContext = {
  isSideMenuActive: boolean;
  toggleSideMenu: (state?: boolean) => void;
};

type SideMenuProviderProps = {
  children: ReactNode;
};

const SideMenuCtx = createContext<SideMenuContext | null>(null);

export function SideMenuProvider({ children }: SideMenuProviderProps) {
  const [isSideMenuActive, setIsSideMenuActive] = useState(true);

  const toggleSideMenu = (state?: boolean) => {
    setIsSideMenuActive(prev => state ?? !prev);
  };

  return (
    <SideMenuCtx.Provider value={{ isSideMenuActive, toggleSideMenu }}>
      {children}
    </SideMenuCtx.Provider>
  );
}

export function useSideMenuContext() {
  const data = useContext(SideMenuCtx);

  if (!data) {
    throw new Error("useSideMenuContext hook should be wrapped by SideMenuProvider");
  }

  return data;
}
