import React, { Component } from 'react';
import HomePresenter from './HomePresenter'
import { MoviesApi } from '../../api' ;

export default class extends Component {
    state = {
        nowPlaying : null,
        upcoming : null,
        popular : null,
        error : null,
        loading : true,
    } ;
    async componentDidMount() {
        try {
            const {
                data : { results : nowPlaying }
            } = await MoviesApi.nowPlaying() ;
            const {
                data : { results : upcoming }
            } = await MoviesApi.upcoming() ;
            const {
                data : { results : popular }
            } = await MoviesApi.popular() ;

            this.setState({ 
                nowPlaying,
                upcoming,
                popular 
            }) ;
        } catch {
            this.setState({  
                error : "Can't find moives infromation."
            }) ;
        } finally {
            this.setState({ 
                loading : false 
            }) ; 
        }
    } ;
    render() {
        const { nowPlaying, upcoming, popular, error, loading } = this.state ;
        return (
            <HomePresenter
                nowPlaying = { nowPlaying }
                upcoming = { upcoming }
                popular = { popular }
                error = { error }
                loading = { loading }
            />
        ) ;
    } ;
}