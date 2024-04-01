import '../styles/about.css';
import React from 'react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { wrap } from 'popmotion';



function Carousal() {
    const [center, setCenter] = useState(0);
    const [images, setImages] = useState([
        '/bi.jpg',
        '/vs.jpg',
        '/bi.jpg',
        '/bi.jpg',
        '/bi.jpg',
    ]);

    const carousalRef = useRef(null);

    const updateCenterImage = (event) => {
        const carousalWidth = carousalRef.current.offsetWidth;
        const scrollX = carousalRef.current.scrollLeft;
        const imgWidth = carousalWidth / images.length;
        const newCenter = Math.round(scrollX / imgWidth);
        setCenter(newCenter);
    };

    useEffect(() => {
        const carousal = carousalRef.current;
        carousal.addEventListener('scroll', updateCenterImage);

        return () => {
            carousal.removeEventListener('scroll', updateCenterImage);
        };
    }, [images.length]);

    const imageIndex = wrap(0, images.length, center);

    const variants = {
        visible: (index) => ({
            scale: index === center ? 1.1 : 1,
            opacity: 1,
            transition: {
                scale: { duration: 0.2 },
            },
        }),
        hidden: { opacity: 0 },
    };

    return (
        <div className="carousal" ref={carousalRef} style={{ overflowX: 'auto', display: 'flex' }}>
            {images.map((image, index) => {
                const imageIndex = wrap(0, images.length, index - center + Math.floor(images.length / 2));
                return (
                    <AnimatePresence initial={false}>
                        <motion.div
                            className='image-container'
                            variants={variants}
                            initial="hidden"
                            animate="visible"
                            custom={index}
                        >
                            <motion.img
                                key={index}
                                src={images[imageIndex]}
                            />
                        </motion.div>
                    </AnimatePresence>
                );
            })}
        </div>
    );
}

function About() {
    return (
        <div className="page-container">
            <div className="about">
                <h2>About Us</h2>
                <Carousal />
            </div>
        </div>
    );
}

export default About;