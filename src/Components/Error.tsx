import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;

const Contanier = styled.div`
    width : 100vw ;
    display : flex ;
    justify-content : center ;
`;

const Text = styled.span`
    color : ${props => props.color} ;
    font-weight : 500 ;
`;

const Error = ({ text, color }) => (
    <Contanier>
        <Text color={color}>{text}</Text>
    </Contanier>
) ;

Error.propTypes = {
    text : PropTypes.string.isRequired
};

export default Error;