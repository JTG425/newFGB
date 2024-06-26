import '../componentStyles/navbar.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import navLogo from '../logos/nav.svg';
import DropDown from './dropdown';

function NavBar(props) {
    const divRef = useRef();
    const [pageIndex, setPageIndex] = useState(0);

    const pages = [
        'Home',
        'Buy Tickets',
        'Locations',
        'Gift Cards',
        'Rentals',
        'Advertise'
    ]

    const [dropdownText, setDropdownText] = useState(pages[0]);



    const handlePageChange = (page) => {
        props.setPage(page);
    }


    return (
        <motion.div
            className="nav"
        >
            <DropDown currentPage={pageIndex} />
            <Link to='/'>
                <motion.img
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-logo"
                    src={navLogo}
                    alt="nav-logo"
                />
            </Link>
            <Link to='/'>
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(148, 3, 3, 0.65)',
                        color: '#fff',
                        border: "none"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Home')}
                >
                    <p>Home</p>
                </motion.button>
            </Link>
            <Link to='/tickets'>
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(148, 3, 3, 0.65)',
                        color: '#fff',
                        border: "none"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Tickets')}
                >
                    <p>Tickets</p>
                </motion.button>
            </Link>

            <Link to='/locations'>
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(148, 3, 3, 0.65)',
                        color: '#fff',
                        border: "none"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Locations')}
                >
                    <p>Locations</p>
                </motion.button>
            </Link>
            <Link to='/about'>
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(148, 3, 3, 0.65)',
                        color: '#fff',
                        border: "none"
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Gift')}
                >
                    <p>About Us</p>
                </motion.button>
            </Link>
        </motion.div>
    );
}

export default NavBar;
