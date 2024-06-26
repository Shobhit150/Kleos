"use client";
import React, { useState, useEffect } from 'react';
import { GoogleMap, InfoWindow, Marker, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '700px'
};

const center = {
  lat: 19.03,
  lng: 73.02
};

const coordinates = [
  { lat : 19.11417283, lng : 72.82911241 },
  { lat : 19.28614865, lng : 72.85978641 },
  { lat : 18.97101899, lng : 72.83151955 },
  { lat : 19.15812865, lng : 72.8537006 },
  { lat : 19.14874545, lng : 72.87676483 },
  { lat : 19.05337011, lng : 72.91930008 },
  { lat : 19.14208106, lng : 72.82915858 },
  { lat : 19.04704382, lng : 72.86035354 },
  { lat : 19.07037462, lng : 72.83125474 },
  { lat : 19.06926239, lng : 72.88532186 },
  { lat : 19.11417283, lng : 72.82911241 }
];

const BusMap = () => {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: apiKey,
    libraries: ['places']
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [directions, setDirections] = useState([]);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  const handleMapClick = () => {
    setSelectedMarker(null);
  };

  const fetchDirections = (source, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    return new Promise((resolve, reject) => {
      directionsService.route(
        {
          origin: source,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            resolve(result);
          } else {
            reject(`Error fetching directions ${result}`);
          }
        }
      );
    });
  };

  useEffect(() => {
    const getAllDirections = async () => {
      const allDirections = [];
      for (let i = 0; i < coordinates.length - 1; i++) {
        try {
          const result = await fetchDirections(coordinates[i], coordinates[i + 1]);
          allDirections.push(result);
        } catch (error) {
          console.error(error);
        }
      }
      setDirections(allDirections);
    };

    if (isLoaded) {
      getAllDirections();
    }
  }, [isLoaded]);

  const mapOptions = {
    disableDefaultUI: true,
    styles: [
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'road',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
      },
      {
        featureType: 'transit',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'off' }]
      },
      {
        featureType: 'transit.station.bus',
        elementType: 'labels.icon',
        stylers: [{ visibility: 'on' }]
      }
    ]
  };

  if (loadError) {
    return <div>Error loading maps</div>;
  }

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
      onClick={handleMapClick}
      options={mapOptions}
    >
      {coordinates.map((coord, index) => (
        <Marker
          key={index}
          position={{ lat: coord.lat, lng: coord.lng }}
          onClick={() => handleMarkerClick({ position: { lat: coord.lat, lng: coord.lng }, title: `Marker ${index + 1}` })}
        />
      ))}

      {directions.map((direction, index) => (
        <DirectionsRenderer
          key={index}
          directions={direction}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: '#FF0000',
              strokeOpacity: 0.8,
              strokeWeight: 4,
            },
          }}
        />
      ))}

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
    </GoogleMap>
  ) : <></>;
};

export default BusMap;
