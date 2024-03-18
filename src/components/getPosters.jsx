import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

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
    const rtsCode = props.rtsCode;
    const serverip = props.serverip;

    useEffect(() => {
        const getPoster = async () => {
            try {
                const response = await fetch(`http://${serverip}/get-poster-images`, {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },
                    body: JSON.stringify({ rtsCode }),
                });

                const json = await response.json();
                setPoster(json.base64Image);
            } catch (error) {
                console.error('Error importing Banner Images:', error);
            }
        };
        getPoster();
    }, [rtsCode]);



    return (
        <div>
            <motion.img
                className='poster'
                src={`data:image/jpg;base64,${poster}`}
                alt={rtsCode}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                animate={isOpen ? "open" : "closed"}
                variants={variants}
                onClick={() => setIsOpen(isOpen => !isOpen)}

            />
        </div>
    );
};

export default MoviePoster;