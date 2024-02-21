import '../componentStyles/navbar.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import navLogo from '../logos/nav.svg';

function DropDown(props) {
    const [showDropdown, setShowDropdown] = useState(false);

    const handlePageChange = (page) => {
        props.setPage(page);
    }


    return (
        <div>
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className='nav-item'
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p>=</p>
            </motion.button>
        </div>
    );
}

export default DropDown;
