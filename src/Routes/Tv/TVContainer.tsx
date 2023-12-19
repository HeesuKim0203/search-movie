import React, { Component } from 'react' ;
import TVPresenter from './TVPresenter' ;
import { TVApi } from '../../api' ;

export default class TVcontainer extends Component {
    state = {
        topRated : null,
        popular : null,
        airingToday : null,
        loading : true,
        error : null,
        topRatedIdList : null,
        popularIdList : null,
        airingTodayIdList : null
    }
    async componentDidMount() {

        const { setIdArr } = this ;

        try {
            const {
                data : { results : topRated }
            } = await TVApi.topRated() ;
            const {
                data : { results : popular } 
            } = await TVApi.popular() ;
            const {
                data : { results : airingToday }
            } = await TVApi.airingToday() ;
            this.setState({
                topRatedIdList : setIdArr(topRated),
                popularIdList : setIdArr(popular),
                airingTodayIdList : setIdArr(airingToday),
                topRated,
                popular,
                airingToday
            }) ;
        } catch {
            this.setState({
                error : "Can't find tv infromation"
            }) ;
        } finally {
            this.setState({ 
                loading : false  
            }) ;
        }
    }

    setIdArr = arr => {
        return arr.map(data => data.id) ;
    }

   render() { 
       const { topRatedIdList, popularIdList, airingTodayIdList, topRated, popular, airingToday, loading, error } = this.state ;
        return (
            <TVPresenter 
                topRatedIdList = { topRatedIdList }
                popularIdList = { popularIdList }
                airingTodayIdList = { airingTodayIdList }
                topRated = { topRated }
                popular = { popular }
                airingToday = { airingToday }
                error = { error }
                loading = { loading }
            />
        );
    } ;
}
