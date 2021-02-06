import React, { Component } from 'react' ;
import DetailPresenter from './DetailPresenter' ;
import { MoviesApi, TVApi } from '../../api';

export default class DetailContaniner extends Component {
    constructor(props) {
        super(props) ;
        const {
            location : { pathname }
        } = props ;
        this.state = {
            result : null,
            loading : true,
            error : null, 
            isMovie : pathname.includes('/movie/'),
        } ;
    }
    async componentDidMount() {
        const { isMovie } = this.state ;
        const { 
            match : {
                params : { id }
            },
            history : { push }
        } = this.props ;


        const parseId = parseInt(id) ;
        if(isNaN(parseId))
            return push("/") ;
        
        let result = null ;
        try {
            if(isMovie) {
                ({
                    data : result
                } = await MoviesApi.movieDetail(parseId)) ;
            }else {
                ({
                    data : result
                } = await TVApi.showDetail(parseId)) ;
            }
            console.log(result.videos.results[0]) ;
            this.setState({
                result
            }) ;
        }catch {
            this.setState({
                error : "Can't find anything."
            }) ;
        }finally {
            this.setState({ 
                loading : false
            }) ;
        }
    }
    render() {
        const { result, loading, error } = this.state ;
        return (
            <DetailPresenter 
                result = { result }
                loading = { loading }
                error = { error }
            />
        ) ;
    } ;
}