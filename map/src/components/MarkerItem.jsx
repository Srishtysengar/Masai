import React from "react";
import { Marker, InfoWindow } from "@react-google-maps/api";

function MarkerItem({ position, info }) {
  return <Marker position={position} title={info} />;
}

export default React.memo(MarkerItem);
