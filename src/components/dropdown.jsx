import '../componentStyles/navbar.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowRight } from "react-icons/fa";

function DropDown(props) {
    const [showDropdown, setShowDropdown] = useState(false);
    const [index, setIndex] = useState(0);
    const currentPage = props.currentPage;

    const handleDropdown = (e) => {
        setShowDropdown(!showDropdown);
        anime({
            targets: '.dropdown-item',
            translateX: [-200, 0],
            easing: 'easeOutExpo',
            duration: 1200,
            delay: anime.stagger(100),
            loop: false,
        });
        anime({
            targets: '.dropdown-list',
            translateX: [-200, 0],
            easing: 'easeOutExpo',
            duration: 1200,
            loop: false,
        });
        anime()
    }


    const pages = [
        'Home',
        'Buy Tickets',
        'Locations',
        'About Us',
    ]
    const ext = [
        "home",
        "tickets",
        "locations",
        "gift"
    ]



    return (
        <motion.div
            className='dropdown-container'
        >
            <motion.button
                className='dropdown-button'
                whileTap={{ scale: 0.9 }}
                onClick={(e) => handleDropdown(e)}
            >
                <RxHamburgerMenu />
            </motion.button>
            <motion.div
                className='dropdown-list'
                key='dropdown-list-key'
                initial={{ opacity: 0 }}
                animate={showDropdown ? { opacity: 1, display: 'flex' } : { opacity: 0, display: 'none' }}

            >
                {pages.map((page, i) => {
                    return (
                        <Link to={`/${ext[i]}`}>
                            <motion.button
                                className='dropdown-item'
                                key={`dropdown-item-${i}-key`}
                                onClick={() => {
                                    setIndex(i);
                                    setShowDropdown(false);
                                }}
                            >
                                <p>{page}</p>
                            </motion.button>
                        </Link>
                    );
                })}
            </motion.div>
            <h1>FGB Theaters</h1>
        </motion.div>
    );
}

export default DropDown;
