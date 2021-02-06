import React from 'react' ;
import PropTypes from 'prop-types' ;
import styled from 'styled-components' ;
import { Link } from 'react-router-dom' ;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' ;
import { faStar } from '@fortawesome/free-solid-svg-icons' ;

const Container = styled.div``;

const Image = styled.div`
    background-image : url(${props => props.bgUrl}) ;
    height : 180px ;
    background-size : cover ;
    border-radius : 4px ;
    background-position : center center ;
    transition : opacity 0.2s linear ;
`;

const Rating = styled.span`
    position : absolute ;
    bottom : 5px ;
    right : 5px ;
    font-size : 12px ;
    opacity : 0 ;
    transition : opacity 0.2s ease-in-out ;
`;

const ImageContainer = styled.div`
    margin-bottom : 5px ;
    position : relative ;
    &:hover {
        ${Image}{
            opacity : 0.6 ;
        }
        ${Rating}{
            opacity : 1 ;
        }
    }
`;

const Title = styled.span`
    display : block ;
    margin-bottom : 3px ;
`;

const Year = styled.span`
    font-size : 10px ;
    color : rgba(255, 255, 255, 0.5) ;
`;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) =>
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`} >
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl ? 
                    `https://image.tmdb.org/t/p/w300${imageUrl}` : require("../assets/noPoster.jpg")}/>
                <Rating>
                    <FontAwesomeIcon icon={faStar} color="#ffee58" />
                    &nbsp; {rating} / 10
                </Rating>
            </ImageContainer>
            <Title>{title.length > 18 ? `${title.substring(0, 18)}...` : title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
 ;

Poster.propTypes = {
    imageUrl : PropTypes.string.isRequired,
    title : PropTypes.string,
    rating : PropTypes.number.isRequired,
    year : PropTypes.string,
};

export default Poster;