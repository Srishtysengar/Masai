import React, { useContext, useMemo } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { LocationContext } from "../context/LocationContext";
import MarkerItem from "./MarkerItem";

const containerStyle = {
  width: "100%",
  height: "500px",
};

const center = {
  lat: 20.5937,
  lng: 78.9629, 
};

function MapContainer({ results }) {
  const { currentLocation } = useContext(LocationContext);
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY",
  });

  const markers = useMemo(() => {
    return results.map((res, index) => (
      <MarkerItem key={index} position={{ lat: res.lat, lng: res.lng }} info={res.name} />
    ));
  }, [results]);

  if (!isLoaded) return <div>Loading Map...</div>;

  return (
    <GoogleMap mapContainerStyle={containerStyle} center={currentLocation || center} zoom={6}>
      {currentLocation && <Marker position={currentLocation} label="You" />}
      {markers}
    </GoogleMap>
  );
}

export default React.memo(MapContainer);
