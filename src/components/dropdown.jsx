import '../componentStyles/navbar.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

function DropDown(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [index, setIndex] = useState(0);

    const pages = [
        'Home',
        'Buy Tickets',
        'Locations',
        'Gift Cards',
        'Rentals',
        'Advertise'
    ]


    return (
        <motion.div
            className='dropdown-container'
        >
            <motion.button
                className='dropdown-button'
                whileTap={{ scale: 0.9 }}
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p>{pages[index]}</p>
            </motion.button>
            {showDropdown && (
                <motion.div
                    className='dropdown-list'
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    {pages.map((page, i) => {
                        return (
                            <motion.button
                                className='dropdown-item'
                                key={i}
                                onClick={() => {
                                    setIndex(i);
                                    setShowDropdown(false);
                                }}
                            >
                                <p>{page}</p>
                            </motion.button>
                        );
                    })}
                </motion.div>
            )}

        </motion.div>
    );
}

export default DropDown;
