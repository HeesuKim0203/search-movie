import React, { Component, memo } from 'react' ;
import DetailPresenter from './DetailPresenter' ;
import { MoviesApi, TVApi } from '../../api';

export default memo(class DetailContaniner extends Component {
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
            slideLoadData : [],
        } ;
    }

    getDataNotAsyncMovie =  id => {
        
        MoviesApi.movieDetail(id).then((e) => {
            const { data } = e ;

            MoviesApi.getRent(id).then((e) => {
                const {
                    data : { 
                        results 
                    } 
                } = e ;
                const { slideLoadData } = this.state ;

                this.setState({
                    slideLoadData : [ ...slideLoadData, { result : data, resultRent : results } ],
                }) ;
            })
        }) ;

        return ;
    }

    getDataNotAsyncTV =  (id) => {
        
        TVApi.showDetail(id).then((e) => {
            const { data } = e ;

            TVApi.getRent(id).then((e) => {
                const {
                    data : { 
                        results 
                    } 
                } = e ;
                const { slideLoadData } = this.state ;

                this.setState({
                    slideLoadData : [ ...slideLoadData, { result : data, resultRent : results } ],
                }) ;
            })
        }) ;

        return ;
    }

    getDataAxios = async () => {
        const { isMovie, slideLoadData } = this.state ;
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
        
        try {
            if(isMovie) {

                const {
                    data 
                } = await MoviesApi.movieDetail(parseId) ;
                
                const { 
                    data : { 
                        results
                    } 
                } = await MoviesApi.getRent(parseId) ;
        
                const dataObj = {
                    result : data,
                    resultRent : results
                }
        
                this.setState({
                    slideLoadData : [ ...slideLoadData, dataObj ],
                }) ;

                const indexId = idList.findIndex(idData => idData === Number(parseId))
                idList.splice(indexId, 1) ;
                
                for(let i = 0 ; i < idList.length ; i++) {
                    this.getDataNotAsyncMovie(idList[i], id) ;
                }
                

            }else {

                const {
                    data
                } = await TVApi.showDetail(parseId) ;
                
                const { 
                    data : { 
                        results 
                    } 
                } = await TVApi.getRent(parseId) ;

                const dataObj = {
                    result : data,
                    resultRent : results
                }
        
                this.setState({
                    slideLoadData : [ ...slideLoadData, dataObj ],
                }) ;

                const indexId = idList.findIndex(idData => idData === Number(parseId))
                idList.splice(indexId, 1) ;

                for(let i = 0 ; i < idList.length ; i++) {
                     this.getDataNotAsyncTV(idList[i]) ;
                }
            }

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
        }) ;
    }

    componentDidMount() {
        this.getDataAxios() ;
    }

    render() {
        const { loading, error } = this.state ;
        const { idList } = this ;

        return (
            <DetailPresenter 
                slideLoadData = { this.state.slideLoadData }
                loading = { loading }
                error = { error }
            />
        ) ;
    } ;
})