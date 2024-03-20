import '../styles/home.css';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Slideshow from '../components/Slideshow';
import MovieCard from '../components/getMovies';
import DatePicker from "react-datepicker";
import "../componentStyles/datepicker.css";

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


function Home(props) {
    const [startDate, setStartDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState(handleDateFormating(startDate));
    const [theater, setTheater] = useState('Capitol');
    // eslint-disable-next-line no-unused-vars
    const [expectedFilmTitleCount, setExpectedFilmTitleCount] = useState(0);
    const [rtsCodes, setRtsCodes] = useState([]);
    const [shows, setShows] = useState([]);
    const serverip = props.serverip;





    useEffect(() => {
        const importXml = async () => {
            try {
                const response = await fetch(`https://il24sop3w1.execute-api.us-east-2.amazonaws.com/default/sendShowTimeXML`);
                const xmlText = await response.text();
                const parser = new DOMParser();
                const xmlDoc = parser.parseFromString(xmlText, 'application/xml');

                const filmTitleElements = xmlDoc.getElementsByTagName('filmtitle');
                setExpectedFilmTitleCount(filmTitleElements.length);

                let allRtsCodes = []; // Temporary array to hold all RTS codes

                const extractedShows = Array.from(filmTitleElements).map((filmTitleElement) => {
                    const name = filmTitleElement.querySelector('name').textContent;
                    const rating = filmTitleElement.querySelector('rating').textContent;
                    const length = filmTitleElement.querySelector('length').textContent;
                    const website = filmTitleElement.querySelector('website').textContent;
                    const rtsCode = filmTitleElement.querySelector('RtsCode').textContent;

                    allRtsCodes.push(rtsCode); // Add rtsCode to the temporary array

                    const showElements = filmTitleElement.getElementsByTagName('show');
                    const extractedShows = Array.from(showElements).map((showElement) => {
                        const date = showElement.querySelector('date').textContent;
                        const time = showElement.querySelector('time').textContent;
                        const saleLink = showElement.querySelector('salelink').textContent;

                        return { date, time, saleLink };
                    });
                    return { name, rating, length, website, rtsCode, shows: extractedShows };
                });

                // Update state with unique RTS codes
                setRtsCodes([...new Set(allRtsCodes)]);

                setShows(extractedShows);
            } catch (error) {
                console.error('Error importing XML:', error);
            }
        };
        importXml();
    }, [formattedDate]);

    const handleTheaterChange = (theater) => {
        setTheater(theater);
        console.log(theater);
    }


    useEffect(() => {
        console.log(formattedDate);
        console.log(shows);
    }, [startDate]);

    return (
        <div className="home">
            <Slideshow rtsCodes={rtsCodes} serverip={serverip} />
            <div className="page-container">
                <p>Select Theater</p>
                <div className='theaterselect'>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='theater-select-item'
                        onClick={() => handleTheaterChange("Capitol")}
                    >
                        <p>Capitol</p>
                    </motion.button>
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className='theater-select-item'
                        onClick={() => handleTheaterChange("Paramount")}
                    >
                        <p>Paramount</p>
                    </motion.button>
                </div>
                <DatePicker
                    className='datePicker'
                    selected={startDate}
                    onChange={(date) => {
                        setStartDate(date);
                        setFormattedDate(handleDateFormating(date));
                    }}
                />
                <MovieCard serverip={serverip} date={formattedDate} shows={shows} />
            </div>
        </div>
    );
}

export default Home;









