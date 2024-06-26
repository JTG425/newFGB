import './App.css';
import loading from './logos/loading.svg';
import React, { Suspense, useEffect } from 'react';
import { useState, useRef } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/navbar';
import Home from './pages/home';
import Tickets from './pages/tickets';
import Locations from './pages/locations';
import About from './pages/about';
import { motion, AnimatePresence } from 'framer-motion';
import { SocialIcon } from 'react-social-icons';


function App() {
  //eslint-disable-next-line
  const [page, setPage] = useState('Home');
  const [fade, setFade] = useState(true);
  const [loadScreen, setLoadScreen] = useState(true);
  const fadeRef = useRef();
  const serverip = '172.16.34.38:3001'
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

  const handleLoadEnd = (loadScreen) => {
    setTimeout(() => {
      setLoadScreen(false);
      setTimeout(() => {
        fadeRef.current.style.display = 'none';
      }, 1000);
    }, 2000);
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


  return (
    <body>
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
        <Suspense fallback={<div>Loading...</div>}>
          <div className="App">
            <header className="App-header">
            </header>
            <div className='nav-container'>
              <NavBar setPage={handlePageChange} />
              <AnimatePresence>
                <motion.div
                  className='page'
                  initial="fadeIn"
                  animate={fade ? 'fadeIn' : 'fadeIn'}
                  variants={pageVariants}
                  exit={{ opacity: 0 }}
                >
                  <Routes>
                    <Route path="/" element={<Home serverip={serverip} loadScreen={loadScreen} setLoadScreen={handleLoadEnd} />} />
                    <Route path="/home" element={<Home serverip={serverip} />} />
                    <Route path="/tickets" element={<Tickets />} />
                    <Route path="/locations" element={<Locations />} />
                    <Route path="/about" element={<About />} />
                  </Routes>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className='footer'>
              <SocialIcon bgColor='#fbfbfb' fgColor='#292323' url="https://www.facebook.com" target='_blank' />
              <SocialIcon bgColor='#fbfbfb' fgColor='#292323' url="https://www.instagram.com/fgbtheaters/" target='_blank' />
            </div>

          </div>
        </Suspense>
      </BrowserRouter>
    </body>
  );
}

export default App;