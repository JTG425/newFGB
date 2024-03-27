import '../componentStyles/getMovies.css';
import { motion, AnimatePresence } from 'framer-motion';
import MoviePoster from './getPosters';
import { useState, Suspense } from 'react';


const convertToStandardTime = (militaryTime) => {
    const hoursMinutes = militaryTime.match(/(\d{2})(\d{2})/);
    let hours = parseInt(hoursMinutes[1], 10);
    const minutes = hoursMinutes[2];
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12;

    return `${hours}:${minutes} ${suffix}`;
};

function MovieCard(props) {
    const [inView, setInView] = useState(false);
    const { date, shows } = props;
    const serverip = props.serverip;

    const cardVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.75,
            },
        },
    };

    return (
        <motion.div
            className='movieCard'
        >
            {shows.map((film, filmIndex) => (
                film.shows.filter(show => show.date === date).length > 0 && (
                    <motion.div
                        className='film'
                        key={filmIndex}
                    >
                        <MoviePoster serverip={serverip} film={film} />
                        <div className='film-header'>
                            <h3>{film.name}</h3>
                            <p>{film.rating}</p>
                            {film.shows.filter(show => show.date === date).map((show, showIndex) => (
                                <div className='showtime' key={showIndex}>
                                    <a
                                        className='showtime-link'
                                        href={show.saleLink}
                                        target="_blank"
                                    >
                                        <motion.button
                                            className='showtime-button'
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            {convertToStandardTime(show.time)}
                                        </motion.button>
                                    </a>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )
            ))}
        </motion.div>
    );
}

export default MovieCard;
