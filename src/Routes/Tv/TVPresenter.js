import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;

import Section from '../../Components/Section' ;
import Loader from '../../Components/Loader' ;
import Error from '../../Components/Error' ;
import Poster from '../../Components/Poster' ;

const Container = styled.div`
    padding : 20px ;
`;

const TVPresenter = ({ 
    topRated, 
    popular, 
    airingToday, 
    loading, 
    error }) =>  (
    <>
        {loading ? <Loader/> : (
            <Container>
                { topRated && topRated.length > 0 && (
                    <Section title="Top Rated Shows">
                        {topRated.map(show => (
                            <Poster 
                                key = {show.id} 
                                id = {show.id}
                                title = {show.original_name}
                                imageUrl = {show.poster_path}
                                rating = {show.vote_average}
                                year = {show.first_air_date && show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                { popular && popular.length > 0 && (
                    <Section title="Popular Shows">
                        {popular.map(show => (
                            <Poster
                                key = {show.id} 
                                id = {show.id}
                                title = {show.original_name}
                                imageUrl = {show.poster_path}
                                rating = {show.vote_average}
                                year = {show.first_air_date && show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>
                )}
                { airingToday && airingToday.length > 0 && (
                    <Section title="Airing Today Shows">
                        {airingToday.map(show => (
                            <Poster
                                key = {show.id} 
                                id = {show.id}
                                title = {show.original_name}
                                imageUrl = {show.poster_path}
                                rating = {show.vote_average}
                                year = {show.first_air_date && show.first_air_date.substring(0, 4)}
                        />))}
                    </Section>
                )}
                { error && <Error text={error} color="#e74c3c"/>}
        </Container>)}
    </>
) ;

TVPresenter.propTypes = {
    topRated : PropTypes.array, 
    popular : PropTypes.array, 
    airingToday : PropTypes.array, 
    loading : PropTypes.bool.isRequired, 
    error : PropTypes.string, 
};

export default TVPresenter ;