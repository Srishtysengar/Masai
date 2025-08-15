/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useCallback } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState(null);

  const updateLocation = useCallback((location) => {
    setCurrentLocation(location);
  }, []);

  return (
    <LocationContext.Provider value={{ currentLocation, updateLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
