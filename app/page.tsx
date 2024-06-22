"use client"
import Image from "next/image";
import Head from 'next/head';
import GoogleMapComponent from '../components/GoogleMap';
import Nav from '@/components/Nav'
import Service from '@/components/Services'
import Footer from '@/components/Footer'

import HomePage from '@/components/Home'
import About from '@/components/About'
export default function Home() {
  
  return (
    <main className=" text-white overflow-hidden bg-black">
      <Nav/>
      <HomePage/>
      
      
      <About/>
      <Service/>
      <Footer/>

    </main>
  );
}
