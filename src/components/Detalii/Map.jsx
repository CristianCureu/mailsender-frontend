import { useState } from "react";
import { useJsApiLoader, GoogleMap, Marker } from "@react-google-maps/api";

const center = { lat: 47.64634117289982, lng: 23.578397855773783 };
function Map() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));

  if (!isLoaded) {
    return <div>Error</div>;
  }
  return (
    <div className="w-screen h-[60vh] flex justify-center bg-neutral-800 mt-8">
      <GoogleMap
        center={center}
        zoom={17}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        options={{ fullscreenControl: false, mapTypeControl: false }}
        onLoad={(map) => setMap(map)}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
}

export default Map;
