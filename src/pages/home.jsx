import '../styles/home.css';
import React, { useState } from 'react';
import Slideshow from '../components/Slideshow';
import MovieCard from '../components/getMovies';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function Home() {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <div className="page-container">
            <Slideshow NUM={3} />
            <p>Select Theater</p>
            <DatePicker
                className='datePicker'
                selected={startDate}
                onChange={(date) => setStartDate(date)}
            />
            <MovieCard />
        </div>
    );
}

export default Home;