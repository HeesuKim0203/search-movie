import React, { Component } from 'react' ;
import SearchPresenter from './SearchPresenter' ;
import { MoviesApi, TVApi } from '../../api' ;

export default class SearchContainer extends Component {
    state = {
        movieResultsIdList : [],
        showResultsIdList : [],
        movieResults : [],
        showResults : [],
        searchTerm : '',
        loading : false,
        error : ''
    } ;
    updateTerm = (e : React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.currentTarget ;
        this.setState({ searchTerm : value }) ;
    }
    handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() ;
        const { searchTerm } = this.state ;
        if(searchTerm !== '') {
            this.searchByTerm() ;
        }
    } ;
    searchByTerm = async() => {
        const { searchTerm } = this.state ;
        const { setIdArr } = this ;

        try {
            const {
                data : { results : movieResults }
            } = await MoviesApi.search(searchTerm) ;
            const {
                data : { results : showResults }
            } = await TVApi.search(searchTerm) ;
            this.setState({ 
                movieResultsIdList : setIdArr(movieResults),
                showResultsIdList : setIdArr(showResults),
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

    setIdArr = (arr : any) => {
        return arr.map((data : any) => data.id) ;
    }

   render() { 
       const { movieResultsIdList, showResultsIdList, movieResults, showResults, loading, error } = this.state ;
        return (
            <SearchPresenter 
                movieResultsIdList = { movieResultsIdList }
                showResultsIdList = { showResultsIdList }
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
