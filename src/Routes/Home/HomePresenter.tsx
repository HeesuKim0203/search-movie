import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;
import Helmet from 'react-helmet' ;

import Section from '../../Components/Section' ;
import Loader from '../../Components/Loader' ;
import Error from '../../Components/Error';
import Poster from '../../Components/Poster' ;

const Container = styled.div`
    padding : 20px ;
`;

const HomePresenter = ({ 
    nowPlaying, 
    upcoming, 
    popular, 
    error, 
    loading,
    nowPlayingIdList,
    upcomingIdLlist,
    popularIdList }) => 
    (<>
        <Helmet>
            <title>Movie | Search Media</title>
        </Helmet>
        { loading ? <Loader/> : (
        <Container>
            { nowPlaying && nowPlaying.length > 0 && ( 
            <Section title="Now Playing Movies">
                { nowPlaying.map(movie => (
                    <Poster 
                        key = {movie.id} 
                        id = {movie.id}
                        title = {movie.original_title}
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        year = {movie.release_date && movie.release_date.substring(0, 4)}
                        idList = {nowPlayingIdList}
                        isMovie = {true}
                    />
                ))}
            </Section>
            )}
            { popular && popular.length > 0 && ( 
            <Section title="Popular Movies">
                { popular.map(movie => (
                    <Poster 
                        key = {movie.id} 
                        id = {movie.id}
                        title = {movie.original_title}
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        year = {movie.release_date && movie.release_date.substring(0, 4)}
                        idList = {upcomingIdLlist}
                        isMovie = {true}
                    />
                ))}
            </Section>
            )}
            { upcoming && upcoming.length > 0 && ( 
            <Section title="Upcoming Movies">
                { upcoming.map(movie => (
                    <Poster 
                        key = {movie.id} 
                        id = {movie.id}
                        title = {movie.original_title}
                        imageUrl = {movie.poster_path}
                        rating = {movie.vote_average}
                        year = {movie.release_date && movie.release_date.substring(0, 4)}
                        idList = {popularIdList}
                        isMovie = {true}
                    />
                ))}
            </Section>
            )}
            { error && <Error text={error} color="#e74c3c"/>}
        </Container>)}
    </>
) ;


HomePresenter.propTypes = {
    nowPlaying : PropTypes.array,
    upcoming : PropTypes.array,
    popular : PropTypes.array,
    error : PropTypes.string,
    loading : PropTypes.bool.isRequired,
};

export default HomePresenter;