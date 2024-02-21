import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import Slideshow from '../components/Slideshow';
import MovieCard from '../components/getMovies';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// XML Date Format: 02222024

const handleDateFormating = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // getMonth() is zero-based
    const day = date.getDate();

    // Pad single digit months and days with a leading zero
    const formattedMonth = month < 10 ? `0${month}` : month.toString();
    const formattedDay = day < 10 ? `0${day}` : day.toString();

    return `${formattedMonth}${formattedDay}${year}`;
}


function Home() {
    const [startDate, setStartDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(handleDateFormating(startDate));
    // eslint-disable-next-line no-unused-vars
    const [expectedFilmTitleCount, setExpectedFilmTitleCount] = useState(0);
    const [rtsCodes, setRtsCodes] = useState([]);
    const [shows, setShows] = useState([]);





    useEffect(() => {
        const importXml = async () => {
            try {
                const response = await fetch(`http://localhost:3001/get-xml`);
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

                const filmTitleElements = xmlDoc.getElementsByTagName('filmtitle');
                setExpectedFilmTitleCount(filmTitleElements.length);

                const extractedShows = Array.from(filmTitleElements).map((filmTitleElement, index, array) => {
                    const name = filmTitleElement.querySelector('name').textContent;
                    const rating = filmTitleElement.querySelector('rating').textContent;
                    const length = filmTitleElement.querySelector('length').textContent;
                    const website = filmTitleElement.querySelector('website').textContent;
                    const rtsCode = filmTitleElement.querySelector('RtsCode').textContent;
                    setRtsCodes((prevRtsCodes) => [...prevRtsCodes, rtsCode]);

                    const showElements = filmTitleElement.getElementsByTagName('show');
                    const extractedShows = Array.from(showElements).map((showElement) => {
                        const date = showElement.querySelector('date').textContent;
                        const time = showElement.querySelector('time').textContent;
                        const saleLink = showElement.querySelector('salelink').textContent;

                        return {date, time, saleLink};
                    });
                    return {name, rating, length, website, rtsCode, shows: extractedShows};
                });
                setShows(extractedShows);
            } catch (error) {
                console.error('Error importing XML:', error);
            }
        };
        importXml();
    }, [formattedDate]);


    useEffect(() => {
        console.log(formattedDate);
        console.log(shows);
    }, [startDate]);

    return (
        <div className="home">
            <Slideshow NUM={3} />
            <div className="page-container">
                <p>Select Theater</p>
                <DatePicker
                    className='datePicker'
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setFormattedDate(handleDateFormating(date));
                    }}
                />
                <MovieCard date={formattedDate} shows={shows} />
            </div>
        </div>
    );
}

export default Home;









