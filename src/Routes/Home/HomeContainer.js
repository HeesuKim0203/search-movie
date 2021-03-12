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
        nowPlayingIdList : null,
        upcomingIdLlist : null,
        popularIdList : null,
        
    } ;
    async componentDidMount() {

        const { setIdArr } = this ;

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
                nowPlayingIdList : setIdArr(nowPlaying),
                upcomingIdLlist : setIdArr(upcoming),
                popularIdList : setIdArr(popular),
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

    setIdArr = arr => {
        return arr.map(data => data.id) ;
    }

    render() {
        const { 
            nowPlayingIdList,
            upcomingIdLlist,
            popularIdList,
            nowPlaying, 
            upcoming, 
            popular, 
            error, 
            loading
        } = this.state ;

        return (
            <HomePresenter
                nowPlayingIdList = { nowPlayingIdList }
                upcomingIdLlist = { upcomingIdLlist }
                popularIdList = { popularIdList }
                nowPlaying = { nowPlaying }
                upcoming = { upcoming }
                popular = { popular }
                error = { error }
                loading = { loading }
            />
        ) ;
    } ;
}