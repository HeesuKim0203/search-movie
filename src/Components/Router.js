import React from 'react' ;
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom' ;

import Home from '../Routes/Home' ;
import Search from '../Routes/Search' ;
import Tv from '../Routes/Tv' ;
import Detail from '../Routes/Detail'

import Header from './Header' ;

export default () => (
    <Router>
        <Header />
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/tv" component={Tv} />
            <Route path="/search" component={Search} />
            <Route path="/movie/:id" component={Detail} />
            <Route path="/show/:id" component={Detail} />
            <Redirect from="*" to="/" />
        </Switch>
    </Router>
) ;