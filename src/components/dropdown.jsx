import '../componentStyles/navbar.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { RxHamburgerMenu } from "react-icons/rx";
import { FaArrowRight, FaLessThanEqual } from "react-icons/fa";

function DropDown(props) {
    const [showDropdown, setShowDropdown] = useState(true);
    const [firstLoad, setFirstLoad] = useState(true);
    const [isOpen, setIsOpen] = useState(false);
    const [index, setIndex] = useState(0);
    const currentPage = props.currentPage;


    const toggleDropdown = () => {
        switch (isOpen) {
            case false:
                anime({
                    targets: '.dropdown-item',
                    translateY: [-300, 0],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(100),
                    loop: false,
                });
                anime({
                    targets: '.dropdown-list',
                    translateY: [-250, 320],
                    easing: 'easeOutExpo',
                    duration: 800,
                    loop: false,
                });
                break;
            case true:
                anime({
                    targets: '.dropdown-item',
                    translateY: [0, -300],
                    easing: 'easeOutExpo',
                    duration: 800,
                    delay: anime.stagger(100, { from: 'first' }),
                    loop: false,
                });
                anime({
                    targets: '.dropdown-list',
                    translateY: [320, -250],
                    easing: 'easeOutExpo',
                    delay: 400,
                    duration: 800,
                    loop: false,
                });
                break;
            default:
                break;
        }
        setIsOpen(!isOpen);
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
        <>
            <motion.div
                className='dropdown-container'
            >
                <h1>FGB Theaters</h1>
                <motion.button
                    className='dropdown-button'
                    whileTap={{ scale: 0.9 }}
                    onClick={() => toggleDropdown()}
                >
                    <RxHamburgerMenu />
                </motion.button>

            </motion.div>
            <div
                className='dropdown-list'
            >
                {pages.map((page, i) => {
                    return (
                        <Link to={`/${ext[i]}`}>
                            <button
                                className='dropdown-item'
                                key={`dropdown-item-${i}-key`}
                                onClick={() => {
                                    setIndex(i);
                                    setShowDropdown(false);
                                    toggleDropdown();
                                }}
                            >
                                <p>{page}</p>
                            </button>
                        </Link>
                    );
                })}
            </div>
        </>
    );
}

export default DropDown;
