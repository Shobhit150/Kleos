import React from 'react';
import { FaFacebook, FaInstagram, FaLinkedin, FaMapMarkerAlt, FaPhone, FaEnvelope } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
const Footer = () => {
    return (
        <footer className="text-white py-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-wrap">
                    {/* Quick Links Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-xl font-bold mb-4">Quick Links</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2">
                                <a href="/about" className="hover:text-white">About Us</a>
                            </li>
                            <li className="mb-2">
                                <a href="/services" className="hover:text-white">Services</a>
                            </li>
                            <li className="mb-2">
                                <a href="/contact" className="hover:text-white">Contact</a>
                            </li>
                            <li className="mb-2">
                                <a href="/faq" className="hover:text-white">FAQ</a>
                            </li>
                        </ul>
                    </div>
                    {/* Follow Us Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-xl font-bold mb-4">Follow Us</h2>
                        <div className="flex space-x-4 text-gray-400">
                            <a href="#" className="hover:text-white">

                                <FaFacebook size={28}/>
                            </a>
                            <a href="#" className="hover:text-white">
                                <FaSquareXTwitter size={28}/>
                            </a>
                            <a href="#" className="hover:text-white">
                                <FaInstagram size={28}/>
                            </a>
                            <a href="#" className="hover:text-white">
                                <FaLinkedin size={28}/>
                            </a>
                        </div>
                    </div>
                    {/* Contact Us Section */}
                    <div className="w-full md:w-1/3 mb-6">
                        <h2 className="text-xl font-bold mb-4">Contact Us</h2>
                        <ul className="text-gray-400">
                            <li className="mb-2 flex items-center gap-2">
                                <FaMapMarkerAlt size={24}/>
                                1234 Street Name, City, State 12345
                            </li>
                            <li className="mb-2 flex items-center gap-2">
                                <FaPhone size={24}/>
                                +1 (123) 456-7890
                            </li>
                            <li className="mb-2 flex items-center gap-2">
                                <FaEnvelope size={24}/>
                                contact@company.com
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 pt-6 mt-6 text-center text-gray-400">
                    &copy; 2024 Company Name. All rights reserved.
                </div>
            </div>
        </footer>
    );
}

export default Footer;
