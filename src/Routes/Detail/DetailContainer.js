import React, { Component } from 'react' ;
import DetailPresenter from './DetailPresenter' ;
import { MoviesApi, TVApi } from '../../api';

export default class DetailContaniner extends Component {
    constructor(props) {
        super(props) ;
        const {
            location : { 
                pathname,  
                state : { idList }
            },
        } = props ;

        this.idList = idList ;

        this.state = {
            loading : true,
            error : null, 
            isMovie : pathname.includes('/movie/'),
            slideLoadData : null,
            slideId : null
        } ;
    }

    getDataAxios = async () => {
        const { isMovie } = this.state ;
        const { idList } = this ;
        const { 
            match : {
                params : { id }
            },
            history : { push }
        } = this.props ;


        const parseId = parseInt(id) ;
        if(isNaN(parseId))
            return push("/") ;
        
        let arr = [];
        try {
            if(isMovie) {
                
                for(let i = 0 ; i < idList.length ; i++) {
                    const {
                        data
                    } = await MoviesApi.movieDetail(idList[i]) ;
                    
                    const { 
                        data : { 
                            results
                        } 
                    } = await MoviesApi.getRent(idList[i]) ;
            
                    const dataObj = {
                        result : data,
                        resultRent : results
                    }
            
                    arr.push(dataObj) ;
                }

            }else {

                for(let i = 0 ; i < idList.length ; i++) {
                    const {
                        data
                    } = await TVApi.showDetail(idList[i]) ;
                    
                    const { 
                        data : { 
                            results
                        } 
                    } = await TVApi.getRent(idList[i]) ;
            
                    const dataObj = {
                        result : data,
                        resultRent : results
                    }
            
                    arr.push(dataObj) ;
                }
            }

            this.setState({
                slideLoadData : arr,
                slideId : id
            })

        }catch {
            this.setState({
                error : "Can't find anything.",
            }) ;
        }finally {
            this.setState({ 
                loading : false
            }) ;
        }
    }

    componentWillUnmount() {
        this.setState({
            slideLoadData : []
        })
    }

    componentDidMount() {
        this.getDataAxios() ;
    }

    render() {
        const { loading, error, slideLoadData, slideId } = this.state ;
        const { idList } = this ;

        return (
            <DetailPresenter 
                slideLoadData = { slideLoadData }
                slideId = { idList.findIndex(idData => idData === Number(slideId)) }
                loading = { loading }
                error = { error }
            />
        ) ;
    } ;
}