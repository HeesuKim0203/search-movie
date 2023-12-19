import React from 'react' ;
import { BrowserRouter, Route, Routes } from 'react-router-dom' ;

import Home from '../Routes/Home' ;
import Search from '../Routes/Search' ;
import Tv from '../Routes/Tv' ;
import Detail from '../Routes/Detail'
import FixedMenu from '../Components/FixedMenu' ;

import Header from './Header' ;

export default () => (
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" exact component={Home} />
            <Route path="/tv" component={Tv} />
            <Route path="/search" component={Search} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/show/:id" component={Detail} />
            {/* <Redirect from="*" to="/" /> */}
        </Routes>
        <FixedMenu />
    </BrowserRouter>
) ;