// XML Date Format: 02222024

import '../componentStyles/dp.css';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import anime from 'animejs/lib/anime.es.js';
import { CiCalendarDate } from "react-icons/ci";

function NewDatePicker(props) {
    const date = new Date();
    const [selectedDay, setSelectedDay] = useState(`${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`);
    const [open, setOpen] = useState(false);

    const dateVariants = {
        closed: {
            height: 'fit-content',
            width: '200px',
        },
        open: {
            height: '400px',
            width: '400px',
        }
    }


    return (
        <div className='datepicker' >
            <motion.button
                className='date-button'
            >
                {selectedDay}
                <CiCalendarDate />
            </motion.button>
        </div >
    );
}

export default NewDatePicker;
