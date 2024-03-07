import React, { Component, memo } from 'react' ;
import DetailPresenter from './DetailPresenter' ;
import { MoviesApi, TVApi } from '../../api' ;
import { NavigateFunction, useLocation, useNavigate } from 'react-router' ;

type DetailContaninerProps = {
    location : {
        pathname : string
        state : number[]
    }
    navigate : NavigateFunction
}

type State = {
    loading : boolean
    error : string
    isMovie : boolean
    slideLoadData : any
}

export default memo(() => {

    const location = useLocation() ;
    const navigate = useNavigate() ;

    return <DetailContaniner location = { location } navigate = { navigate } />
})


class DetailContaniner extends Component<DetailContaninerProps, {}>  {

    idList : number[] ;
    state : State ;

    constructor(props : DetailContaninerProps) {
        super(props) ;
        const {
            location : { 
                pathname,  
                state : idList
            },
        } = props ;

        this.idList = idList ;

        this.state = {
            loading : true,
            error : '', 
            isMovie : pathname.includes('/movie/'),
            slideLoadData : [],
        } ;
    }

    getDataNotAsyncMovie = (id : number) => {
        
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

    getDataNotAsyncTV =  (id : number) => {
        
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
            location : {
                pathname
            },
            navigate
        } = this.props ;

        const parseId = parseInt(pathname.split("/")[2]) ;

        if(isNaN(parseId)) return navigate("/") ;
        
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

                const indexId = idList.findIndex((idData : number) => idData === Number(parseId)) ;
                idList.splice(indexId, 1) ;

                console.log("idList : ", idList)
                
                for(let i = 0 ; i < idList.length ; i++) {
                    this.getDataNotAsyncMovie(idList[i]) ;
                }

                this.setState({
                    slideLoadData : slideLoadData.concat(dataObj),
                }) ;

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

                const indexId = idList.findIndex(idData => idData === Number(parseId))
                idList.splice(indexId, 1) ;

                for(let i = 0 ; i < idList.length ; i++) {
                    this.getDataNotAsyncTV(idList[i]) ;
                }
  
                this.setState({
                    slideLoadData : [ ...slideLoadData, dataObj ],
                }) ;
            }

        }catch(err) {
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

        return (
            <DetailPresenter 
                slideLoadData = { this.state.slideLoadData }
                loading = { loading }
                error = { error }
            />
        ) ;
    } ;
}