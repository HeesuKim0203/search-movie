import React, { Component } from 'react' ;
import SearchPresenter from './SearchPresenter' ;
import { MoviesApi, TVApi } from '../../api' ;

export default class SearchContainer extends Component {
    state = {
        movieResults : null,
        showResults : null,
        searchTerm : '',
        loading : false,
        error : null
    } ;
    updateTerm = (e) => {
        const { value } = e.currentTarget ;
        this.setState({ searchTerm : value }) ;
    }
    handleSubmit = (e) => {
        e.preventDefault() ;
        const { searchTerm } = this.state ;
        if(searchTerm !== '') {
            this.searchByTerm() ;
        }
    } ;
    searchByTerm = async() => {
        const { searchTerm } = this.state ;
        try {
            const {
                data : { results : movieResults }
            } = await MoviesApi.search(searchTerm) ;
            const {
                data : { results : showResults }
            } = await TVApi.search(searchTerm) ;
            this.setState({ 
                movieResults,
                showResults,
                loading : true 
            }) ;
        } catch {
            this.setState({
                error : "Can't find results." 
            })
        } finally {
            this.setState({ 
                loading : false 
            }) ;
        }
    }
   render() { 
       const { movieResults, showResults, loading, error } = this.state ;
        return (
            <SearchPresenter 
                movieResults = { movieResults }
                showResults = { showResults }
                error = { error }
                loading = { loading }
                handleSubmit = { this.handleSubmit }
                updateTerm= { this.updateTerm } 
            />
        );
    } ;
}
