"use client";
import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, DirectionsRenderer, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px'
};

const center = {
  lat: 19.03,
  lng: 73.02
};

const GoogleMapComponent = ({ source, destination }) => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'] // Include the places library
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error fetching location:', error.message);
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);

  useEffect(() => {
    if (source && destination && isLoaded) {
      calculateRoute(source, destination);
    }
  }, [source, destination, isLoaded]);

  const calculateRoute = (origin, destination) => {
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`Error fetching directions ${result}`);
          }
        }
      );
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [
          { visibility: 'on' }
        ]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'off' }
        ]
      },
      {
        featureType: 'transit.station.bus',
        elementType: 'labels.icon',
        stylers: [
          { visibility: 'on' }
        ]
      }
    ]
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation || center}
      zoom={16}
      onClick={handleMapClick}
      options={mapOptions}
    >
      {userLocation && (
        <Marker
          position={userLocation}
          onClick={() => handleMarkerClick({ position: userLocation, title: 'Your Location' })}
        />
      )}

      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={() => setSelectedMarker(null)}
        >
          <div>
            <h3>{selectedMarker.title}</h3>
            <p>Additional information or content here.</p>
          </div>
        </InfoWindow>
      )}

      {directions && (
        <DirectionsRenderer
          directions={directions}
        />
      )}
    </GoogleMap>
  ) : <></>;
};

export default GoogleMapComponent;
