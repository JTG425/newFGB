import '../componentStyles/navbar.css';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import navLogo from '../logos/nav.svg';

//https://codesandbox.io/p/sandbox/framer-motion-mouse-position-2b4sd?file=%2Fsrc%2FApp.js%3A40%2C1-69%2C2
function getRelativeCoordinates(event, referenceElement) {
    const position = {
        x: event.pageX,
        y: event.pageY
    };

    const offset = {
        left: referenceElement.offsetLeft,
        top: referenceElement.offsetTop,
        width: referenceElement.clientWidth,
        height: referenceElement.clientHeight
    };

    let reference = referenceElement.offsetParent;

    while (reference) {
        offset.left += reference.offsetLeft;
        offset.top += reference.offsetTop;
        reference = reference.offsetParent;
    }

    const startX = (position.x - offset.left) / offset.width;
    const startY = (position.y - offset.top) / offset.height;

    return {
        x: position.x - offset.left,
        y: position.y - offset.top,
        width: offset.width,
        height: offset.height,
        centerX: (position.x - offset.left - offset.width / 2) / (offset.width / 2) - 0.5,
        centerY: (position.y - offset.top - offset.height / 2) / (offset.height / 2) - 0.5,
        startX: startX,
        startY: startY,
    };
}

function NavBar(props) {
    const divRef = useRef();
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [showDropdown, setShowDropdown] = useState(false);
    const [pageIndex, setPageIndex] = useState(0);

    const pages = [
        'Home',
        'Buy Tickets',
        'Locations',
        'Gift Cards',
        'Groups & Rentals',
        'Advertise'
    ]

    const [dropdownText, setDropdownText] = useState(pages[0]);

    // eslint-disable-next-line
    const handleMouseMove = e => {
        const mousePos = getRelativeCoordinates(e, divRef.current);
        const gradientBackground = `radial-gradient(circle at ${mousePos.startX * 100}% ${mousePos.startY * 100}%, rgba(198,4,0,0.5) 0%, rgba(198,4,4,0) 25%)`;
        divRef.current.style.background = gradientBackground;
    };

    // eslint-disable-next-line
    const handleMouseLeave = () => {
        divRef.current.style.background = '';
    };



    const handlePageChange = (page) => {
        props.setPage(page);
        setShowDropdown(false);
    }

    const handleButtonHover = (index) => {
        divRef.current.style.background = '';
    }

    const dropdownVariants = {
        open: {
            opacity: 1,
            display: 'flex',
            transition: {
                duration: 0.5,
            }
        },
        closed: {
            display: 'none',
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    const dropdownItemVariants = {
        open: {
            opacity: 1,
            transition: {
                duration: 0.5
            }
        },
        closed: {
            display: 'none',
            opacity: 0,
            transition: {
                duration: 0.5
            }
        }
    }

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        window.addEventListener('resize', handleResize);
        console.log(isMobile);
        // Clean up the event listener on component unmount
        return () => window.removeEventListener('resize', handleResize);
        // eslint-disable-next-line
    }, [window.innerWidth]);


    return (
        <motion.div
            className="nav"
            ref={divRef}
            onMouseMove={handleMouseMove}
            onHoverEnd={handleMouseLeave}
        >
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
                        backgroundColor: 'rgba(198, 4, 4, 0.5)',
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
                        backgroundColor: 'rgba(198, 4, 4, 0.5)',
                        color: '#fff',
                        border: "none",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Tickets')}
                >
                    <p>Buy Tickets</p>
                </motion.button>
            </Link>

            <Link to='/locations'>
                <motion.button
                    whileHover={{
                        scale: 1.1,
                        backgroundColor: 'rgba(198, 4, 4, 0.5)',
                        color: '#fff',
                        border: "none",
                    }}
                    whileTap={{ scale: 0.9 }}
                    className="nav-item"
                    onClick={() => handlePageChange('Locations')}
                >
                    <p>Locations</p>
                </motion.button>
            </Link>
            <motion.button
                whileHover={{
                    scale: 1.1,
                    backgroundColor: 'rgba(198, 4, 4, 0.5)',
                    color: '#fff',
                    border: "none",
                }}
                whileTap={{ scale: 0.9 }}
                className='nav-item'
                onClick={() => setShowDropdown(!showDropdown)}
            >
                <p>{isMobile ? dropdownText : '≡'}</p>
            </motion.button>

            <motion.div
                className='dropdown-container'
                initial="closed"
                variants={dropdownVariants}
                animate={showDropdown ? 'open' : 'closed'}
                transition={{ duration: 0.5 }}
            >
                {isMobile && (
                    <>
                        <Link to='/'>
                            <motion.button
                                whileHover={{
                                    scale: 1.01,
                                    backgroundColor: 'rgba(198, 4, 4, 0.5)',
                                    color: '#fff',
                                    border: "none",
                                }}
                                whileTap={{ scale: 0.9 }}
                                animate={showDropdown ? 'open' : 'closed'}
                                className="dropdown-item"
                                variants={dropdownItemVariants}
                                onClick={() => handlePageChange('Home')}
                            >
                                <p>Home</p>
                            </motion.button>
                        </Link>
                        <Link to='/tickets'>
                            <motion.button
                                whileHover={{
                                    scale: 1.01,
                                    backgroundColor: 'rgba(198, 4, 4, 0.5)',
                                    color: '#fff',
                                    border: "none",
                                }}
                                whileTap={{ scale: 0.9 }}
                                animate={showDropdown ? 'open' : 'closed'}
                                className="dropdown-item"
                                variants={dropdownItemVariants}
                                onClick={() => handlePageChange('Tickets')}
                            >
                                <p>Buy Tickets</p>
                            </motion.button>
                        </Link>

                        <Link to='/locations'>
                            <motion.button
                                whileHover={{
                                    scale: 1.01,
                                    backgroundColor: 'rgba(198, 4, 4, 0.5)',
                                    color: '#fff',
                                    border: "none",
                                }}
                                whileTap={{ scale: 0.9 }}
                                animate={showDropdown ? 'open' : 'closed'}
                                className="dropdown-item"
                                variants={dropdownItemVariants}
                                onClick={() => handlePageChange('Locations')}
                            >
                                <p>Locations</p>
                            </motion.button>
                        </Link>
                    </>
                )}

                <Link to='/gift'>
                    <motion.button
                        whileHover={{
                            scale: 1.01,
                            backgroundColor: 'rgba(198, 4, 4, 0.5)',
                            color: '#fff',
                            border: "none",
                        }}
                        whileTap={{ scale: 0.9 }}
                        animate={showDropdown ? 'open' : 'closed'}
                        className="dropdown-item"
                        variants={dropdownItemVariants}
                        onClick={() => handlePageChange('Gift')}
                    >
                        <p>Gift Cards</p>
                    </motion.button>
                </Link>

                <Link to='/groups'>
                    <motion.button
                        whileHover={{
                            scale: 1.01,
                            backgroundColor: 'rgba(198, 4, 4, 0.5)',
                            color: '#fff',
                            border: "none",
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="dropdown-item"
                        animate={showDropdown ? 'open' : 'closed'}
                        variants={dropdownItemVariants}
                        onClick={() => handlePageChange('Groups')}
                    >
                        <p>Groups & Rentals</p>
                    </motion.button>
                </Link>

                <Link to='/advertise'>
                    <motion.button
                        whileHover={{
                            scale: 1.01,
                            backgroundColor: 'rgba(198, 4, 4, 0.5)',
                            color: '#fff',
                            border: "none",
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="dropdown-item"
                        animate={showDropdown ? 'open' : 'closed'}
                        variants={dropdownItemVariants}
                        onClick={() => handlePageChange('Advertise')}
                    >
                        <p>Advertise</p>
                    </motion.button>
                </Link>
            </motion.div>
        </motion.div>
    );
}

export default NavBar;
