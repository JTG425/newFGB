import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { set } from 'animejs';

const variants = {
    closed: {
        opacity: 1,
        x: 0,
        zIndex: 5,
    },
    open: {
        transition: { staggerChildren: 0.07, delayChildren: 0.2 },
        opacity: 0,
        x: 0,
    },
}


const MoviePoster = (props) => {
    const [poster, setPoster] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [recieved, setRecieved] = useState(false);
    const rtsCode = props.rtsCode;
    const serverip = props.serverip;

    useEffect(() => {
        const getPoster = async () => {
            try {
                const response = await fetch(`https://1shn6ru7ic.execute-api.us-east-1.amazonaws.com/default/send-posters`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ rtsCode }),
                });

                const json = await response.json();
                setPoster(json.base64Image);
                setRecieved(true)
            } catch (error) {
                console.error('Error importing Poster Images:', error);
            }
        };
        getPoster();
    }, [rtsCode]);



    return (
        <div>
            {poster != null ? (
                <motion.img
                    className="poster"
                    src={`data:image/jpg;base64,${poster}`}
                    alt={rtsCode}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.95 }}
                />
            ) : (
                <motion.div className="not-found">
                    <p>No Poster Found</p>
                </motion.div>
            )}
        </div>
    );
};

export default MoviePoster;