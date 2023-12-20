import React, { Component } from 'react' ;
import PropTypes from 'prop-types' ;
import axios from 'axios' ;
import Router from './Router' ;
import GlobalStyle from './GlobalSytles' ;

class App extends Component {
  render() {
    return (
      <>
        <GlobalStyle />
        <Router />
      </>
    )
  } ; 
} 

export default App;
