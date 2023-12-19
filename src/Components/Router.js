import React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;

import Home from '../Routes/Home' ;
import Search from '../Routes/Search' ;
import Tv from '../Routes/Tv' ;
import Detail from '../Routes/Detail'
import FixedMenu from '../Components/FixedMenu' ;

import Header from './Header' ;

export default () => (
    <BrowserRouter basename = { process.env.PUBLIC_URL } >
        <Header />
        <Routes>
            <Route path="/" element = { <Home /> } />
            <Route path="/tv" element = { <Tv /> } />
            <Route path="/search" element = { <Search /> } />
            <Route path="/movie/:id" element = { <Detail /> } />
            <Route path="/show/:id" element = { <Detail /> } />
        </Routes>
        <FixedMenu />
    </BrowserRouter>
) ;