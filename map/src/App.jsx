import React, { useState, useCallback } from "react";
import MapContainer from "./components/MapContainer";
import SearchBox from "./components/SearchBox";
import SearchResultsList from "./components/SearchResultsList";
import RoutePlanner from "./components/RoutePlanner";
import WeatherWidget from "./components/WeatherWidget";
import { LocationProvider } from "./context/LocationContext";

function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = useCallback((results) => {
    setSearchResults(results);
  }, []);

  return (
    <LocationProvider>
      <div className="app">
        <h1>React Map Application</h1>
        <SearchBox onResults={handleSearchResults} />
        <SearchResultsList results={searchResults} />
        <RoutePlanner />
        <MapContainer results={searchResults} />
        <WeatherWidget />
      </div>
    </LocationProvider>
  );
}

export default App;
