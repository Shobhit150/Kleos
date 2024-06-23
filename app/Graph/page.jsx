"use client";
import React, { useState, useRef } from 'react';
import Nav from '@/components/Nav';
import BusMap2 from '@/components/BusMap2'
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const Page = () => {
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
    const [source, setSource] = useState('');
    const [destination, setDestination] = useState('');
    const [sourceInput, setSourceInput] = useState('');
    const [destinationInput, setDestinationInput] = useState('');
    const sourceAutocompleteRef = useRef(null);
    const destinationAutocompleteRef = useRef(null);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey,
        libraries: ['places']
    });

    if (!isLoaded) {
        return <div>Loading...</div>;
    }

    const handleSeeRoute = () => {
        const sourcePlace = sourceAutocompleteRef.current.getPlace();
        const destinationPlace = destinationAutocompleteRef.current.getPlace();
        setSource(sourcePlace ? sourcePlace.geometry.location : '');
        setDestination(destinationPlace ? destinationPlace.geometry.location : '');
    };

    return (
        <div className='text-black '>
            <Nav />
            <div className=''>
                
                <div className='mt-20'>
                    
                </div>
            </div>
        </div>
    );
};

export default Page;
