"use client";
import React, { useState, useRef } from 'react';
import Nav from '@/components/Nav';
import GoogleMapComponent from '@/components/GoogleMap';
import { FaLocationArrow } from "react-icons/fa6";
import { IoLocationSharp } from "react-icons/io5";
import { FaRegCircle, FaRegSquare } from "react-icons/fa";
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import BusMap2 from '@/components/BusMap2';
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
        <div className='text-black bg-black'>
            <Nav />
            <div className=' mt-20'>
            <BusMap2 />
            </div>
            <div className='pt-20 flex flex-row justify-between items-center p-auto h-screen overflow-hidden'>
                <div className=' text-white flex flex-col gap-2 w-[28%] m-auto'>
                    <h1 className='text-5xl font-bold my-8'>Optimise routes with <span className='text-gray-500'>Bus Mitra</span></h1>
                    <p className='text-sm'>Request a ride, hop in, and go.</p>
                    <div className='flex flex-col gap-2 mt-1'>
                        <div className='text-black bg-white border rounded-md flex flex-row justify-between items-center px-4 py-2 w-full'>
                            <FaRegCircle color='black' size={10} />
                            <Autocomplete
                                onLoad={autocomplete => (sourceAutocompleteRef.current = autocomplete)}
                                onPlaceChanged={() => {
                                    const place = sourceAutocompleteRef.current.getPlace();
                                    setSourceInput(place ? place.formatted_address : '');
                                }}
                                className='w-full px-3'
                            >
                                <input
                                    type="text"
                                    className="bg-transparent border-none w-full py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none"
                                    placeholder="Source"
                                    value={sourceInput}
                                    onChange={(e) => setSourceInput(e.target.value)}
                                />
                            </Autocomplete>
                            <FaLocationArrow color='black' size={24} />
                        </div>
                        <div className='text-black bg-white border rounded-md flex flex-row justify-between items-center px-4 py-2'>
                            <FaRegSquare color='black' size={10} />
                            <Autocomplete
                                onLoad={autocomplete => (destinationAutocompleteRef.current = autocomplete)}
                                onPlaceChanged={() => {
                                    const place = destinationAutocompleteRef.current.getPlace();
                                    setDestinationInput(place ? place.formatted_address : '');
                                }}
                                className='w-full px-3'
                            >
                                <input
                                    type="text"
                                    className="bg-transparent border-none w-full py-2 px-3 text-gray-700 placeholder-gray-500 leading-tight focus:outline-none"
                                    placeholder="Destination"
                                    value={destinationInput}
                                    onChange={(e) => setDestinationInput(e.target.value)}
                                />
                            </Autocomplete>
                            <IoLocationSharp color='black' size={24} />
                        </div>
                    </div>
                    <div className='mt-5'>
                        <button
                            className='bg-white text-black rounded-md font-semibold py-3 px-6'
                            onClick={handleSeeRoute}
                        >
                            See optimised route
                        </button>
                    </div>
                </div>
                <div className='w-1/2 pr-32 rounded-lg overflow-hidden'>
                    <GoogleMapComponent source={source} destination={destination} />
                </div>
            </div>
        </div>
    );
};

export default Page;
