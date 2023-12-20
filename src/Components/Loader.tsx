import React from 'react';
import styled from 'styled-components' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faSpinner } from '@fortawesome/free-solid-svg-icons' ;

const Container = styled.div`
    height : 95vh ;
    width : 95vw ;
    display : flex ;
    justify-content : center ;
    padding-top : 50px ;
`;

export default () => (
    <Container>
        <span role="img" aria-label="Loading">
            <FontAwesomeIcon icon={faSpinner} pulse size="2x"/>
        </span>
    </Container>
) ;