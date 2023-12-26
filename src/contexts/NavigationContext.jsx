import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const navigationContext = createContext();

export default function NavigationProvider({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(function () {
    function updatePath() {
      setCurrentPath(window.location.pathname);
    }
    window.addEventListener("popstate", updatePath);

    return () => {
      window.removeEventListener("popstate", updatePath);
    };
  }, []);

  function navigate(to) {
    window.history.pushState({}, "", to);
    setCurrentPath(to);
  }

  const value = { currentPath, navigate };

  return (
    <navigationContext.Provider value={value}>
      {children}
    </navigationContext.Provider>
  );
}

export function useNavigation() {
  const context = useContext(navigationContext);
  if (context === undefined)
    throw new Error(
      "Navigation Context was used outside of Navogation Provider."
    );

  return context;
}
