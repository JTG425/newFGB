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
    const tempImages = [
        "https://i.imgur.com/MFS98kO.jpg",
        "https://i.imgur.com/Z2iLEbb.jpg",
        "https://i.imgur.com/yVZ51br.jpg",
        "https://i.imgur.com/ZJy8iEn.jpg",
        "https://i.imgur.com/d754pyD.jpg",
        "https://i.imgur.com/1yDcN6a.jpg",
        "https://i.imgur.com/niXe4Tx.jpg",
        "https://i.imgur.com/34yAiG4.jpg",
        "https://i.imgur.com/Fc1vo1T.jpg"
    ]

    // useEffect(() => {
    //     const getPoster = async () => {
    //         try {
    //             const response = await fetch(`https://v9m5j4di57.execute-api.us-east-1.amazonaws.com/default/send-banner-images`, {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({ rtsCodes }),
    //             });

    //             const json = await response.json();
    //             //Push all images into an array
    //             let images = []
    //             for (let i = 0; i < json.length; i++) {
    //                 images.push(json[i].base64Image)
    //             }
    //             setImages(images)
    //         } catch (error) {
    //             console.error('Error importing Poster Images:', error);
    //         }
    //     };
    //     getPoster();
    // }, [rtsCodes]);

    const [[imageIndex, direction], setImageIndex] = useState([0, 0]);
    const activeImageIndex = wrap(0, images.length, imageIndex);

    const swipeToImage = (swipeDirection) => {
        setImageIndex([imageIndex + swipeDirection, swipeDirection]);
    };

    useEffect(() => {
        setImages(tempImages)
    }, []);

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
                            src={`${images[activeImageIndex]}`}
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
                            src={`${images[activeImageIndex]}`}
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
