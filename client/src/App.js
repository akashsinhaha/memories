import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import NavBar from './components/navBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';

export default function App() {

  return ( 
    <Router>
    <Container maxWidth='lg'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} exact />
        <Route path='/auth' element={<Auth />} exact />
      </Routes>
    </Container>
    </Router>
  );
}
