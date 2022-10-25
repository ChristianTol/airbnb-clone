import { useState } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import getCenter from "geolib/es/getCenter";

function ReactMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});

  // Transform the search results object into the { latitude, longitude } object
  const coordinates = searchResults.map(result => ({
    longitude: result.long,
    latitude: result.lat,
  }));

  // The latitude and longitude of the center of locations coordinates.
  const center = getCenter(coordinates);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: "100%",
    latitude: center.latitude,
    longitude: center.longitude,
    zoom: 11,
  });

  return (
    <ReactMapGL 
      mapStyle="mapbox://styles/christian-tol/cl9oaecxs002d15o3o806phse"
      mapboxAccessToken={process.env.mapbox_key}
      onMouseMove={(nextViewport) => setViewport(nextViewport)}
      {...viewport}
    >
      {searchResults.map((result) => (
        <div key={result.long}>
          <Marker
            longitude={result.long}
            latitude={result.lat}
            offsetLeft={-20}
            offsetTop={-10}
          >
            <p
              role="img"
              onClick={() => setSelectedLocation(result)} 
              className="cursor-pointer text-2xl animate-bounce"
              aria-label="push-pin"
            >📌</p>
          </Marker>

          {/* The popup that should show if the marker is clicked. */}
          {selectedLocation.long === result.long ? (
            <Popup
              onClose={() => setSelectedLocation({})}
              closeOnClick={false}
              latitude={result.lat}
              longitude={result.long}
            >
              {result.title}
            </Popup>
          ) : (
            false
          )}
        </div>
      ))}
    </ReactMapGL>
  )
}

export default ReactMap;