"use client";
import React, { useEffect, useState } from 'react';
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
    libraries: ['places']
  });

  const [selectedMarker, setSelectedMarker] = useState(null);
  const [markers, setMarkers] = useState([{ position: { lat: 19.03, lng: 73.02 }, title: 'Marker 1' }, { position: { lat: 24.00, lng: 74.00 }, title: 'Marker 2' }]);
  const [directions, setDirections] = useState(null);

  useEffect(() => {
    if (source && destination) {
      setMarkers([{ position: source, title: 'Source' }, { position: destination, title: 'Destination' }]);
      fetchDirections(source, destination);
    }
  }, [source, destination]);

  const fetchDirections = (source, destination) => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: source,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
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
      center={center}
      zoom={16}
      onClick={handleMapClick}
      options={mapOptions}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
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

      {directions && (
        <DirectionsRenderer
          directions={directions}
        />
      )}
    </GoogleMap>
  ) : <></>;
};

export default GoogleMapComponent;
