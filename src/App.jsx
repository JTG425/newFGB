import './App.css';
import loading from './logos/loading.svg';
import React, { useEffect } from 'react';
import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Tickets from './pages/tickets';
import Locations from './pages/locations';
import Gift from './pages/gift';
import Advertise from './pages/advertise';
import Groups from './pages/groups';
import { motion, AnimatePresence } from 'framer-motion';


function App() {
  const [page, setPage] = useState('Home');
  const [fade, setFade] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);
  const fadeRef = useRef();

  const loadVariants = {
    loadScreen: {
      opacity: 1,
      transition: {
        duration: 0.5
      }

    },
    loadScreenOut: {
      opacity: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const handlePageChange = (page) => {
    setPage(page);
    setFade(!fade);
    setTimeout(() => {
      setFade(false);
    }, 600);
  }

  const pageVariants = {
    fadeIn: {
      opacity: 1,
      transition: {
        duration: 0.5
      }
    },
    fadeOut: { opacity: 0 },
  }

  useEffect(() => {
    setTimeout(() => {
      setLoadScreen(false);
      setTimeout(() => {
        fadeRef.current.style.display = 'none';
      }, 1000);
    }, 2000);
  }, []);

  return (
    <BrowserRouter>
      <motion.div
        className="Loading"
        initial="loadScreen"
        ref={fadeRef}
        animate={loadScreen ? 'loadScreen' : 'loadScreenOut'}
        variants={loadVariants}
      >
        <img src={loading} alt="loading" className='loading-svg' />
      </motion.div>
      <div className="App">
        <header className="App-header">
        </header>
        <div className='nav-container'>
          <NavBar setPage={handlePageChange} />
          <AnimatePresence>
            <motion.div
              className='page-container'
              initial="fadeIn"
              animate={fade ? 'fadeIn' : 'fadeIn'}
              variants={pageVariants}
              exit={{ opacity: 0 }}
            >
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tickets" element={<Tickets />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/gift" element={<Gift />} />
                <Route path="/advertise" element={<Advertise />} />
                <Route path="/groups" element={<Groups />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </BrowserRouter>
  );
}

export default App;