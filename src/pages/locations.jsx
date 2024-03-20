import '../styles/locations.css';
import '../styles/home.css';
import React from 'react';
import { motion } from 'framer-motion';
import { APIProvider, Map, Marker } from '@vis.gl/react-google-maps';
import { FaPhoneAlt } from 'react-icons/fa';

function CapitolMap() {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyCfxgnYS8pYuytuL9ai-iLhFEVwXm1KRIk';
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
                className='Map'
                defaultCenter={{ lat: 44.261061827334025, lng: -72.57827485597765 }}
                defaultZoom={16}
                minZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <Marker position={{ lat: 44.261061827334025, lng: -72.57827485597765 }} />
            </Map>
        </APIProvider>

    );
}

function ParamountMap() {
    const GOOGLE_MAPS_API_KEY = 'AIzaSyCfxgnYS8pYuytuL9ai-iLhFEVwXm1KRIk';
    return (
        <APIProvider apiKey={GOOGLE_MAPS_API_KEY}>
            <Map
                className='Map'
                defaultCenter={{ lat: 44.19965415427316, lng: -72.50371633046281 }}
                defaultZoom={15}
                gestureHandling={'greedy'}
                disableDefaultUI={true}
            >
                <Marker position={{ lat: 44.19965415427316, lng: -72.50371633046281 }} />
            </Map>
        </APIProvider>

    );
}

function Locations() {
    return (
        <div className="page-container">
            <div className='locations'>
                <h2>Locations</h2>
                <span className='info'>
                    <p><b>Hours of Operation:</b> The box office opens 30 minutes before the show and remains open for 20 minutes after the last show of the day.</p>
                </span>
                <div className='maps'>
                    <motion.div
                        className='cap-map'
                    >
                        <h3>Capitol Theaters</h3>
                        <div className='map-container'>
                            <CapitolMap />
                        </div>
                        <div className='map-cover'></div>
                        <motion.a
                            href='tel:18022290343'
                            className='call'
                        >
                            <span className='call-content'>
                                <FaPhoneAlt />
                                <p>(802)-229-0343</p>
                            </span>
                        </motion.a>
                    </motion.div>
                    <motion.div
                        className='par-map'
                    >
                        <h3>Paramount Theaters</h3>
                        <div className='map-container'>
                            <ParamountMap />
                        </div>
                        <div className='map-cover'></div>
                        <motion.a
                            href='tel:18024790078'
                            className='call'
                        >
                            <span className='call-content'>
                                <FaPhoneAlt />
                                <p>(802)-229-0343</p>
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default Locations;