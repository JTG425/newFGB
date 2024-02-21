import '../componentStyles/getMovies.css';
import { motion } from 'framer-motion';
import MoviePoster from './getPosters';


const convertToStandardTime = (militaryTime) => {
    const hoursMinutes = militaryTime.match(/(\d{2})(\d{2})/);
    let hours = parseInt(hoursMinutes[1], 10);
    const minutes = hoursMinutes[2];
    const suffix = hours >= 12 ? "PM" : "AM";
    hours = hours % 12 || 12; 

    return `${hours}:${minutes} ${suffix}`;
};

function MovieCard(props) {
    const { date, shows } = props;

    return (
        <motion.div className='movieCard'>
            {shows.map((film, filmIndex) => (
                film.shows.filter(show => show.date === date).length > 0 && (
                    <div className='film' key={filmIndex}>
                        <div className='film-header'>
                            <h3>{film.name}</h3>
                            <p>{film.rating}</p>
                        </div>
                        <MoviePoster rtsCode={film.rtsCode} />
                        {film.shows.filter(show => show.date === date).map((show, showIndex) => (
                            <div className='showtime' key={showIndex}>
                                <a href={show.salelink}>{convertToStandardTime(show.time)}</a>
                            </div>
                        ))}
                    </div>
                )
            ))}
        </motion.div>
    );
}

export default MovieCard;
