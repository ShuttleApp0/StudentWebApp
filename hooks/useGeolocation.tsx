import { useEffect, useState } from 'react';

const useGeoLocation = () => {
  const [location, setLocation] = useState({
    loaded: false,
    coordinates: { lat: '', lng: '' },
  });

  const onSuccess = (location) => {
    const { latitude, longitude } = location.coords;

    // Log the coordinates to the console
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);

    setLocation({
      loaded: true,
      coordinates: {
        lat: latitude,
        lng: longitude,
      },
    });
  };

  const onError = (error) => {
    setLocation({
      loaded: true,
      error,
    });
  };

  useEffect(() => {
    if (!("geolocation" in navigator)) {
      onError({
        code: 0,
        message: 'Geolocation not supported',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  return location;
};

export default useGeoLocation;