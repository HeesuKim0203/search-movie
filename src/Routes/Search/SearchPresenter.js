import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;
import Helmet from 'react-helmet' ;

import Section from '../../Components/Section' ;
import Loader from '../../Components/Loader' ;
import Error from '../../Components/Error' ;
import Poster from '../../Components/Poster' ;

const Container = styled.div`
    padding : 20px ;
`;

const Form = styled.form`
    margin-bottom : 50px ;
    width : 100% ;
`;

const Input = styled.input`
    all : unset ;
    font-size : 28px ;
    width : 100% ;
`;

const SearchPresenter = ({ 
    movieResults, 
    showResults, 
    loading, 
    error, 
    handleSubmit,
    updateTerm }) => (
        <Container>
            <Helmet>
                <title>Search | I flix</title>
            </Helmet>
            <Form onSubmit = {handleSubmit}>
                <Input placeholder="Search Movies or TV Shows..." onChange={updateTerm}/>
            </Form>
            { loading ? <Loader/> : <>
                {movieResults && movieResults.length >0 &&
                    <Section title="Moive Results">
                        {movieResults.map(movie => (
                            <Poster 
                                key = {movie.id} 
                                id = {movie.id}
                                title = {movie.original_title}
                                imageUrl = {movie.poster_path}
                                rating = {movie.vote_average}
                                year = {movie.release_date && movie.release_date.substring(0, 4)}
                                isMovie = {true}
                            />
                        ))}
                    </Section>}
                {showResults && showResults.length >0 &&
                    <Section title="Show Results">
                        {showResults.map(show => (
                            <Poster 
                                key = {show.id} 
                                id = {show.id}  
                                title = {show.original_name}
                                imageUrl = {show.poster_path}
                                rating = {show.vote_average}
                                year = {show.first_air_date && show.first_air_date.substring(0, 4)}
                            />
                        ))}
                    </Section>}
            </>}
            { error && <Error text={error} color="#e74c3c"/>}
            { showResults && movieResults && showResults.length === 0 && movieResults.length === 0  
                && <Error text="Nothing found for searchTerm" color="#999"/>}
        </Container>
    );

SearchPresenter.propTypes = {
    movieResults : PropTypes.array,
    tvResults : PropTypes.array,
    searchTerm : PropTypes.string.isRequired,
    loading : PropTypes.bool.isRequired,
    error : PropTypes.string,
    handleSubmit : PropTypes.func.isRequired,
    updateTerm : PropTypes.func.isRequired
};

export default SearchPresenter;