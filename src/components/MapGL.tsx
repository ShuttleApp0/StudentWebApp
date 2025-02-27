import React, { useState, useEffect } from 'react';
import Map, { GeolocateControl, Marker } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoidGhlbG9jYWxnb2RkIiwiYSI6ImNtMm9ocHFhYTBmczQya3NnczhoampiZ3gifQ.lPNutwk6XRi_kH_1R1ebiw';

function MapGL({ selectedLocation }) {
  const [viewState, setViewState] = useState({
    longitude: -1.573568,
    latitude: 6.678045,
    zoom: 14.95,
  });

  const [markers, setMarkers] = useState([]);
  const [userLocation, setUserLocation] = useState(null); // State for user's current location

  // Update map when a location is selected
  useEffect(() => {
    if (selectedLocation) {
      setViewState((prevState) => ({
        ...prevState,
        longitude: selectedLocation.longitude,
        latitude: selectedLocation.latitude,
      }));
      setMarkers([{ longitude: selectedLocation.longitude, latitude: selectedLocation.latitude }]);
    }
  }, [selectedLocation]);

  // Get user's current location
  const getCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ longitude, latitude }); // Store user's location
          setViewState((prevState) => ({
            ...prevState,
            longitude,
            latitude,
            zoom: 15,
          }));
          console.log(latitude)
        },
        (error) => {
          console.error("Geolocation Error:", error);
          alert(`Error getting location: ${error.message}`);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  return (
    <>
      {/* Button to get current location */}
      <button
        onClick={getCurrentLocation}
        style={{
          position: 'absolute',
          bottom: 26,
          right: 26,
          zIndex: 1,
          padding: '8px 16px',
          backgroundColor: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Get My Location
      </button>

      <Map
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        {...viewState}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onMove={(evt) => setViewState(evt.viewState)}
      >
        {/* Marker for selected location */}
        {markers.map((marker, index) => (
          <Marker key={`selected-${index}`} longitude={marker.longitude} latitude={marker.latitude}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
              <g filter="url(#filter0_d_629_5946)">
                <rect x="2" width="41" height="41" rx="20.5" fill="white"/>
                <path d="M22.5 20.0729C21.9336 20.0729 21.3905 19.8479 20.99 19.4474C20.5895 19.047 20.3646 18.5038 20.3646 17.9375C20.3646 17.3711 20.5895 16.828 20.99 16.4275C21.3905 16.027 21.9336 15.8021 22.5 15.8021C23.0663 15.8021 23.6095 16.027 24.0099 16.4275C24.4104 16.828 24.6354 17.3711 24.6354 17.9375C24.6354 18.2179 24.5802 18.4956 24.4728 18.7547C24.3655 19.0137 24.2082 19.2492 24.0099 19.4474C23.8117 19.6457 23.5762 19.803 23.3172 19.9103C23.0581 20.0177 22.7804 20.0729 22.5 20.0729ZM22.5 11.9583C20.9142 11.9583 19.3934 12.5883 18.2721 13.7096C17.1508 14.8309 16.5208 16.3517 16.5208 17.9375C16.5208 22.4219 22.5 29.0416 22.5 29.0416C22.5 29.0416 28.4791 22.4219 28.4791 17.9375C28.4791 16.3517 27.8492 14.8309 26.7279 13.7096C25.6066 12.5883 24.0858 11.9583 22.5 11.9583Z" fill="#FF8A00"/>
              </g>
              <defs>
                <filter id="filter0_d_629_5946" x="0" y="0" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_629_5946"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_629_5946" result="shape"/>
                </filter>
              </defs>
            </svg>
          </Marker>
        ))}

        {/* Marker for user's current location */}
        {userLocation && (
          <Marker key="user-location" longitude={userLocation.longitude} latitude={userLocation.latitude}>
            <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45 45" fill="none">
              <g filter="url(#filter0_d_629_5946)">
                <rect x="2" width="41" height="41" rx="20.5" fill="white"/>
                <path d="M22.5 20.0729C21.9336 20.0729 21.3905 19.8479 20.99 19.4474C20.5895 19.047 20.3646 18.5038 20.3646 17.9375C20.3646 17.3711 20.5895 16.828 20.99 16.4275C21.3905 16.027 21.9336 15.8021 22.5 15.8021C23.0663 15.8021 23.6095 16.027 24.0099 16.4275C24.4104 16.828 24.6354 17.3711 24.6354 17.9375C24.6354 18.2179 24.5802 18.4956 24.4728 18.7547C24.3655 19.0137 24.2082 19.2492 24.0099 19.4474C23.8117 19.6457 23.5762 19.803 23.3172 19.9103C23.0581 20.0177 22.7804 20.0729 22.5 20.0729ZM22.5 11.9583C20.9142 11.9583 19.3934 12.5883 18.2721 13.7096C17.1508 14.8309 16.5208 16.3517 16.5208 17.9375C16.5208 22.4219 22.5 29.0416 22.5 29.0416C22.5 29.0416 28.4791 22.4219 28.4791 17.9375C28.4791 16.3517 27.8492 14.8309 26.7279 13.7096C25.6066 12.5883 24.0858 11.9583 22.5 11.9583Z" fill="#4285F4"/> {/* Blue color for user location */}
              </g>
              <defs>
                <filter id="filter0_d_629_5946" x="0" y="0" width="45" height="45" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                  <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                  <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                  <feOffset dy="2"/>
                  <feGaussianBlur stdDeviation="1"/>
                  <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                  <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_629_5946"/>
                  <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_629_5946" result="shape"/>
                </filter>
              </defs>
            </svg>
          </Marker>
        )}

        <GeolocateControl 
          positionOptions={{ enableHighAccuracy: true }} 
          trackUserLocation={true}
          onGeolocate={(position) => {
            const { longitude, latitude } = position.coords;
            setUserLocation({ longitude, latitude });
            setViewState((prev) => ({ ...prev, longitude, latitude, zoom: 15 }));
            console.log('yes')
          }}
        />

        <GeolocateControl position="top-right" trackUserLocation />
      </Map>
    </>
  );
}

export default MapGL;