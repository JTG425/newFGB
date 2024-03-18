import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

import "../componentStyles/slideshow.css";

const sliderVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
    }),
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => ({
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0
    })
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => Math.abs(offset) * velocity;

const Slideshow = ({ rtsCodes, serverip }) => {
    const [images, setImages] = useState([]);

    useEffect(() => {
        const getBannerImages = async () => {
            try {
                const response = await fetch(`http://${serverip}/get-banner-images`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ rtsCodes }) // Sending an array of RTS codes
                });
                const data = await response.json();
                setImages(data.base64Images); // Expecting an array of base64 images
            } catch (error) {
                console.error('Error fetching banner images:', error);
            }
        };

        if (rtsCodes.length > 0) {
            getBannerImages();
        }
    }, [rtsCodes]); // Dependency on rtsCodes

    const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
    const activeImageIndex = wrap(0, images.length, imageIndex);

    const swipeToImage = (swipeDirection) => {
        setImageIndex([imageIndex + swipeDirection, swipeDirection]);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            swipeToImage(1);
        }, 10000); // Swipe every 10 seconds

        return () => clearInterval(interval);
    }, [imageIndex]);

    return (
        <div className="slideshow">
            <AnimatePresence initial={false} custom={direction}>
                {images.length > 0 && (
                    <>
                        <motion.img
                            key={`${imageIndex}-background`}
                            className="background-image"
                            src={`data:image/jpg;base64,${images[activeImageIndex]}`}
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    swipeToImage(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    swipeToImage(-1);
                                }
                            }}
                        />
                        <motion.img
                            key={imageIndex}
                            className="foreground-image"
                            src={`data:image/jpg;base64,${images[activeImageIndex]}`}
                            custom={direction}
                            variants={sliderVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{
                                x: { type: "spring", stiffness: 300, damping: 30 },
                                opacity: { duration: 0.2 }
                            }}
                            drag="x"
                            dragConstraints={{ left: 0, right: 0 }}
                            dragElastic={1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = swipePower(offset.x, velocity.x);

                                if (swipe < -swipeConfidenceThreshold) {
                                    swipeToImage(1);
                                } else if (swipe > swipeConfidenceThreshold) {
                                    swipeToImage(-1);
                                }
                            }}
                        />
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Slideshow;
