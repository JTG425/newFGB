import '../componentStyles/getMovies.css';
import { motion } from 'framer-motion';

function MovieCard(props) {
    return (
        <motion.div className='movieCard'>
            <p>Movie 1</p>
        </motion.div>
    );
}

export default MovieCard;
