import React, { Component } from 'react' ;
import TVPresenter from './TVPresenter' ;
import { TVApi } from '../../api' ;

export default class TVcontainer extends Component {
    state = {
        topRated : null,
        popular : null,
        airingToday : null,
        loading : true,
        error : null
    }
    async componentDidMount() {
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
   render() { 
       const { topRated, popular, airingToday, loading, error } = this.state ;
        return (
            <TVPresenter 
                topRated = { topRated }
                popular = { popular }
                airingToday = { airingToday }
                error = { error }
                loading = { loading }
            />
        );
    } ;
}
