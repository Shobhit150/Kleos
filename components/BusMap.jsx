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

const GoogleMapComponent = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places'] // Include the places library
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [nearestBusStation, setNearestBusStation] = useState(null);
  const [directions, setDirections] = useState(null);

  // State for source and destination inputs
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');

  useEffect(() => {
    // Fetch user's current location using Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          if (isLoaded) {
            fetchNearestBusStation(latitude, longitude);
          }
        },
        (error) => {
          console.error('Error fetching location:', error.message);
        }
      );
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, [isLoaded]);

  const fetchNearestBusStation = (lat, lng) => {
    if (window.google) {
      const service = new window.google.maps.places.PlacesService(document.createElement('div'));
      const request = {
        location: new window.google.maps.LatLng(lat, lng),
        radius: '1500',
        type: ['transit_station'],
        keyword: 'bus'
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results.length > 0) {
          const nearestStation = results[0]; // Assuming the first result is the nearest
          setNearestBusStation({
            position: nearestStation.geometry.location,
            title: nearestStation.name
          });
          calculateRoute({ lat, lng }, nearestStation.geometry.location);
        }
      });
    }
  };

  const calculateRoute = (origin, destination) => {
    if (window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin,
          destination,
          travelMode: window.google.maps.TravelMode.WALKING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
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

  // Function to handle Google Places Autocomplete for inputs
  const handleAutocomplete = (value, setter) => {
    const autocompleteService = new window.google.maps.places.AutocompleteService();
    if (value.length > 0 && isLoaded) {
      autocompleteService.getPlacePredictions({ input: value }, (predictions) => {
        if (predictions) {
          setter(predictions[0].description); // Assuming the first prediction is the desired result
        }
      });
    }
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

      {nearestBusStation && (
        <Marker
          position={nearestBusStation.position}
          onClick={() => handleMarkerClick({ position: nearestBusStation.position, title: nearestBusStation.title })}
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
