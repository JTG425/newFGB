import '../componentStyles/getMovies.css';
import { motion } from 'framer-motion';


function MoviePoster(props) {
    const rtsCode = props.rtsCode;

    return (
        <motion.div className='moviePoster'>
            <div className='film-poster'>
                <p>{rtsCode}</p>
            </div>
        </motion.div>
    );
}

export default MoviePoster;
