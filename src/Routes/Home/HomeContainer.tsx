import React, { Component } from 'react';
import HomePresenter from './HomePresenter'
import { MoviesApi } from '../../api' ;

export default class extends Component {
    state = {
        nowPlaying : [],
        upcoming : [],
        popular : [],
        error : "",
        loading : true,
        nowPlayingIdList : [],
        upcomingIdLlist : [],
        popularIdList : [],
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

    setIdArr = (arr : any) => {
        return arr.map((data : any) => data.id) ;
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
                nowPlaying = { nowPlaying }
                upcoming = { upcoming }
                popular = { popular }
                error = { error }
                loading = { loading }
                nowPlayingIdList = { nowPlayingIdList }
                upcomingIdLlist = { upcomingIdLlist }
                popularIdList = { popularIdList }
            />
        ) ;
    } ;
}