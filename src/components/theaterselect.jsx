import '../componentStyles/navbar.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function TheaterSelect(props) {

    const handleTheaterChange = (theater) => {
        props.setTheater(theater);
    }


    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='theater-select'
                onClick={handleTheaterChange("Capitol")}
            >
                <p>Capitol</p>
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='theater-select'
                onClick={handleTheaterChange("Paramount")}
            >
                <p>Paramount</p>
            </motion.button>
        </div>
    );
}

export default TheaterSelect;
