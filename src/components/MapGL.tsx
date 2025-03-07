import React, { useState, useEffect } from 'react';
import Map, { Marker, Source, Layer } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGhlbG9jYWxnb2RkIiwiYSI6ImNtMm9ocHFhYTBmczQya3NnczhoampiZ3gifQ.lPNutwk6XRi_kH_1R1ebiw';

interface Coordinates {
  longitude: number;
  latitude: number;
}

interface Route {
  geometry: any;
  distance: number;
  duration: number;
  start: Coordinates;
  end: Coordinates;
}

function MapGL({ selectedLocation, dropOffLocation, isHomepage = false, pickUp, pickUpLocation }: {
  selectedLocation: Coordinates | null; // Selected location (used for homepage)
  dropOffLocation: Coordinates | null; // Drop-off point
  isHomepage?: boolean; // Add this prop to control homepage behavior
  pickUp: Coordinates | null; // Pick-up point
  pickUpLocation: Coordinates | null; // Explicit pick-up location
}) {
  const [viewState, setViewState] = useState({
    longitude: -1.573568,
    latitude: 6.678045,
    zoom: 14.95,
  });

  const [pickupToDropoffRoute, setPickupToDropoffRoute] = useState<Route | null>(null);
  const [selectedToPickupRoute, setSelectedToPickupRoute] = useState<Route | null>(null);
  

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

    // On details page, fetch routes between points
    if (!isHomepage) {
      // Route between pick-up and drop-off points
      if (pickUpLocation && dropOffLocation) {
        fetchRoute(pickUpLocation, dropOffLocation, setPickupToDropoffRoute);
      }
      
      // Route between selected location and pick-up location
      if (selectedLocation && pickUpLocation) {
        fetchRoute(selectedLocation, pickUpLocation, setSelectedToPickupRoute);
      }
    }
  }, [selectedLocation, dropOffLocation, isHomepage, pickUpLocation]);

  const fetchRoute = async (
    start: Coordinates, 
    end: Coordinates, 
    setRouteFunction: React.Dispatch<React.SetStateAction<Route | null>>
  ) => {
    const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?geometries=geojson&access_token=${MAPBOX_ACCESS_TOKEN}`;
    
    try {
      const response = await fetch(url);
      const data = await response.json();
      
      if (data.routes && data.routes.length > 0) {
        setRouteFunction({
          geometry: data.routes[0].geometry,
          distance: data.routes[0].distance,
          duration: data.routes[0].duration,
          start,
          end
        });
      }
    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="30"
            height="48"
            viewBox="0 0 30 48"
            fill="none"
          >
            <g clipPath="url(#clip0_706_132)">
              <path d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" fill="white"/>
              <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" fill="white"/>
              <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" stroke="#34A853" strokeWidth="2"/>
              <path d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" fill="black"/>
              <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="#34A853"/>
              <path d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" fill="white"/>
            </g>
            <defs>
              <clipPath id="clip0_706_132">
                <rect width="30" height="48" fill="white"/>
              </clipPath>
            </defs>
          </svg>
        </Marker>
      )}

      {/* Details page elements */}
      {!isHomepage && (
        <>
          {/* Render selected location (origin point) */}
          {selectedLocation && (
            <Marker longitude={selectedLocation.longitude} latitude={selectedLocation.latitude}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="48"
                viewBox="0 0 30 48"
                fill="none"
              >
                <g clipPath="url(#clip0_706_132)">
                  <path d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" stroke="#3F51B5" strokeWidth="2"/>
                  <path d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" fill="black"/>
                  <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="#3F51B5"/>
                  <path d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_706_132">
                    <rect width="30" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Marker>
          )}

          {/* Marker for the pick-up point */}
          {pickUpLocation && (
            <Marker longitude={pickUpLocation.longitude} latitude={pickUpLocation.latitude}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="48"
                viewBox="0 0 30 48"
                fill="none"
              >
                <g clipPath="url(#clip0_706_132)">
                  <path d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" stroke="#34A853" strokeWidth="2"/>
                  <path d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" fill="black"/>
                  <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="#34A853"/>
                  <path d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_706_132">
                    <rect width="30" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Marker>
          )}

          {/* Marker for the drop-off point */}
          {dropOffLocation && (
            <Marker longitude={dropOffLocation.longitude} latitude={dropOffLocation.latitude}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="48"
                viewBox="0 0 30 48"
                fill="none"
              >
                <g clipPath="url(#clip0_706_132)">
                  <path d="M21 42C21 38.6863 18.3137 36 15 36C11.6863 36 9 38.6863 9 42C9 45.3137 11.6863 48 15 48C18.3137 48 21 45.3137 21 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" fill="white"/>
                  <path d="M19 42C19 39.7909 17.2091 38 15 38C12.7909 38 11 39.7909 11 42C11 44.2091 12.7909 46 15 46C17.2091 46 19 44.2091 19 42Z" stroke="#FFCE31" strokeWidth="2"/>
                  <path d="M16 28C16 27.4477 15.5523 27 15 27C14.4477 27 14 27.4477 14 28V42C14 42.5523 14.4477 43 15 43C15.5523 43 16 42.5523 16 42V28Z" fill="black"/>
                  <path d="M30 15C30 6.71573 23.2843 0 15 0C6.71573 0 0 6.71573 0 15C0 23.2843 6.71573 30 15 30C23.2843 30 30 23.2843 30 15Z" fill="#FFCE31"/>
                  <path d="M21 15C21 11.6863 18.3137 9 15 9C11.6863 9 9 11.6863 9 15C9 18.3137 11.6863 21 15 21C18.3137 21 21 18.3137 21 15Z" fill="white"/>
                </g>
                <defs>
                  <clipPath id="clip0_706_132">
                    <rect width="30" height="48" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
            </Marker>
          )}

          {/* Render the route between selected location and pick-up point */}
          {selectedToPickupRoute && (
            <Source id="selected-to-pickup-route" type="geojson" data={{
              type: 'Feature',
              properties: {},
              geometry: selectedToPickupRoute.geometry
            }}>
              <Layer
                id="selected-to-pickup-layer"
                type="line"
                paint={{
                  'line-color': '#3F51B5',
                  'line-width': 5,
                  'line-opacity': 0.75,
                  'line-dasharray': [2, 1]
                }}
              />
            </Source>
          )}

          {/* Render the route between pick-up and drop-off points */}
          {pickupToDropoffRoute && (
            <Source id="pickup-to-dropoff-route" type="geojson" data={{
              type: 'Feature',
              properties: {},
              geometry: pickupToDropoffRoute.geometry
            }}>
              <Layer
                id="pickup-to-dropoff-layer"
                type="line"
                paint={{
                  'line-color': '#FFCE31',
                  'line-width': 5,
                  'line-opacity': 0.75
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