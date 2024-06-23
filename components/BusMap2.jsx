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
  { lat: 19.11417283, lng: 72.82911241, name: '10TH ROAD' },
  { lat: 19.28614865, lng: 72.85978641, name: '16TH ROAD' },
  { lat: 18.97101899, lng: 72.83151955, name: '600 TENAMENT GATE' },
  { lat: 19.15812865, lng: 72.8537006, name: 'A.H.ANSARI CHOWK' },
  { lat: 19.14874545, lng: 72.87676483, name: 'A.H.SCHOOL' },
  { lat: 19.05337011, lng: 72.91930008, name: 'A.T.I.' },
  { lat: 19.14208106, lng: 72.82915858, name: 'AAI TULJABHAVANI CHK' },
  { lat: 19.04704382, lng: 72.86035354, name: 'AAKASH GANGA SOCIETY (DHARAVI)' },
  { lat: 19.07037462, lng: 72.83125474, name: 'AAREY HOSPITAL-MUNICIPAL SCHOOL' },
  { lat: 19.06926239, lng: 72.88532186, name: 'AAREY ROAD SUBWAY' }
];

const edges = [
    { source: 0, destination: 6 },
    { source: 0, destination: 1 },
    { source: 1, destination: 7 },
    { source: 2, destination: 5 },
    { source: 3, destination: 7 },
    { source: 4, destination: 9 },
    { source: 5, destination: 7 },
    { source: 6, destination: 9 },
    { source: 8, destination: 9 }
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
      for (let edge of edges) {
        const source = coordinates[edge.source];
        const destination = coordinates[edge.destination];
        try {
          const result = await fetchDirections(source, destination);
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
          icon={index === 0 ? 'http://maps.google.com/mapfiles/ms/icons/green-dot.png' : null}
          onClick={() => handleMarkerClick({ position: { lat: coord.lat, lng: coord.lng }, title: coord.name })}
        />
      ))}

      {directions.map((direction, index) => (
        <DirectionsRenderer
          key={index}
          directions={direction}
          options={{
            suppressMarkers: true,
            polylineOptions: {
              strokeColor: index === 8 ? '#0000FF' : '#FF0000', // Purple for the first path, blue for others
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
