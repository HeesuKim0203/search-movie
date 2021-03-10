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
            resultRent : null,
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
        let resultRent = null ;
        try {
            if(isMovie) {
                const {
                    data
                } = await MoviesApi.movieDetail(parseId) ;

                result = data ;
                
                const { 
                    data : { 
                        results
                    } 
                } = await MoviesApi.getRent(parseId) ;

                resultRent = results ;
            }else {
                const {
                    data
                } = await TVApi.showDetail(parseId) ;

                result = data ;

                const { 
                    data : { 
                        results
                    } 
                } = await TVApi.getRent(parseId) ;

                resultRent = results ;
            }

            this.setState({
                resultRent : resultRent || null,
                result
            })

        }catch {
            this.setState({
                error : "Can't find anything.",
                loading : false
            }) ;
        }finally {
            this.setState({ 
                loading : false
            }) ;
        }
    }
    render() {
        const { result, loading, error, resultRent } = this.state ;

        return (
            <DetailPresenter 
                resultRent = { resultRent }
                result = { result }
                loading = { loading }
                error = { error }
            />
        ) ;
    } ;
}