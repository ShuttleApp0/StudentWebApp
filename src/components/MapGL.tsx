import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';
import { solveTSP } from './../components/solveTSP'; // Custom TSP solver (see below)

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGhlbG9jYWxnb2RkIiwiYSI6ImNtMm9ocHFhYTBmczQya3NnczhoampiZ3gifQ.lPNutwk6XRi_kH_1R1ebiw';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface DropPoint {
  name: string;
  latitude: number;
  longitude: number;
}

interface Route {
  geometry: any;
  distance: number;
  duration: number;
  start: Coordinates;
  end: Coordinates;
}

interface MapGLProps {
  selectedLocation: Coordinates | null;
  dropOffLocation: Coordinates | null;
  isHomepage?: boolean;
  pickUp: Coordinates | null;
  pickUpLocation: Coordinates | null;
  dropPoints?: DropPoint[];
}

function MapGL({
  selectedLocation,
  dropOffLocation,
  isHomepage = false,
  pickUp,
  pickUpLocation,
  dropPoints = [],
}: MapGLProps) {
  const [viewState, setViewState] = useState({
    longitude: -1.573568,
    latitude: 6.678045,
    zoom: 14.95,
  });

  const [route, setRoute] = useState<Route | null>(null);

  useEffect(() => {
    // Set the map view to the selected location (homepage) or pick-up point (details page)
    const centerLocation = isHomepage ? selectedLocation : pickUpLocation;
    if (centerLocation) {
      setViewState((prevState) => ({
        ...prevState,
        longitude: centerLocation.longitude,
        latitude: centerLocation.latitude,
      }));
    }

    // On details page, fetch the shortest route passing through all drop points
    if (!isHomepage && selectedLocation && pickUpLocation && dropOffLocation) {
      const allWaypoints = [
        selectedLocation,
        ...dropPoints.map((point) => ({
          longitude: point.longitude,
          latitude: point.latitude,
        })),
        pickUpLocation,
        dropOffLocation,
      ];

      // Solve TSP to find the optimal order of waypoints
      const optimalWaypoints = solveTSP(allWaypoints);

      // Fetch the route with the optimal waypoints
      fetchRouteWithWaypoints(optimalWaypoints, setRoute);
    }
  }, [selectedLocation, dropOffLocation, isHomepage, pickUpLocation, dropPoints]);

  const fetchRouteWithWaypoints = async (
    waypoints: Coordinates[],
    setRouteFunction: React.Dispatch<React.SetStateAction<Route | null>>
  ) => {
    // Construct the URL with all waypoints
    const coordinates = waypoints
      .map((point) => `${point.longitude},${point.latitude}`)
      .join(';');
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${coordinates}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        setRouteFunction({
          geometry: data.routes[0].geometry,
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
          start: waypoints[0],
          end: waypoints[waypoints.length - 1],
        });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  // Reusable Marker Icon Component
  const MarkerIcon = ({ color }: { color: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="48"
      viewBox="0 0 30 48"
      fill="none"
    >
      <g clipPath="url(#clip0_706_132)">
        <path d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" fill="white" />
        <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" fill="white" />
        <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" stroke={color} strokeWidth="2" />
        <path d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" fill="black" />
        <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill={color} />
        <path d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" fill="white" />
      </g>
      <defs>
        <clipPath id="clip0_706_132">
          <rect width="30" height="48" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  return (
    <Map
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      {...viewState}
      style={{ width: '100vw', height: '100vh', position: 'absolute' }}
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onMove={(evt) => setViewState(evt.viewState)}
    >
      {/* Render the selected location only on the homepage */}
      {isHomepage && selectedLocation && (
        <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}>
          <MarkerIcon color="#34A853" />
        </Marker>
      )}

      {/* Details page elements */}
      {!isHomepage && (
        <>
          {/* Render selected location (origin point) */}
          {selectedLocation && (
            <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}>
              <MarkerIcon color="#3F51B5" />
            </Marker>
          )}

          {/* Marker for the pick-up point */}
          {pickUpLocation && (
            <Marker longitude={pickUpLocation.longitude} latitude={pickUpLocation.latitude}>
              <MarkerIcon color="#34A853" />
            </Marker>
          )}

          {/* Marker for the drop-off point */}
          {dropOffLocation && (
            <Marker longitude={dropOffLocation.longitude} latitude={dropOffLocation.latitude}>
              <MarkerIcon color="#FFCE31" />
            </Marker>
          )}

          {/* Render drop points (excluding Paa Joe Round About) */}
          {dropPoints
            .filter((point) => point.name !== 'Paa Joe Round About')
            .map((dropPoint, index) => (
              <Marker key={index} longitude={dropPoint.longitude} latitude={dropPoint.latitude}>
                <MarkerIcon color="#3F51B5" />
              </Marker>
            ))}

          {/* Render the shortest route passing through all drop points */}
          {route && (
            <Source
              id="route"
              type="geojson"
              data={{
                type: 'Feature',
                properties: {},
                geometry: route.geometry,
              }}
            >
              <Layer
                id="route-layer"
                type="line"
                paint={{
                  'line-color': '#3F51B5',
                  'line-width': 5,
                  'line-opacity': 0.75,
                }}
              />
            </Source>
          )}
        </>
      )}
    </Map>
  );
}

export default MapGL;