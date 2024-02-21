import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";

import "../componentStyles/slideshow.css";

const sliderVariants = {
    enter: (direction) => {
        return {
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction) => {
        return {
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const Slideshow = ({ NUM }) => {
    const IMAGES = [
        "https://i.imgur.com/O17QsIJ.png",
        "https://i.imgur.com/66jhGvG.png",
        "https://i.imgur.com/O17QsIJ.png"
    ];


    const [[imageCount, direction], setImageCount] = useState([0, 0]);

    const activeImageIndex = wrap(0, NUM, imageCount);

    const swipeToImage = (swipeDirection) => {
        setImageCount([imageCount + swipeDirection, swipeDirection]);
    };

    useEffect(() => {
        const autoSlideInterval = setInterval(() => {
            swipeToImage(1); // Automatically swipe to the next image after 5 seconds
        }, 10000); /// 10000 = 10 seconds.

        return () => clearInterval(autoSlideInterval); // Cleanup interval on component unmount

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [imageCount]);


    return (
        <div className="slideshow">
            <AnimatePresence initial={false} custom={direction}>
                <div className="background-image">
                    <motion.img
                        key={imageCount}
                        src={`${IMAGES[activeImageIndex]}`}
                        custom={direction}
                        variants={sliderVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                    />
                </div>
                <motion.img
                    key={imageCount}
                    src={`${IMAGES[activeImageIndex]}`}
                    custom={direction}
                    variants={sliderVariants}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
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
            </AnimatePresence>
        </div>
    );
};

export default Slideshow;