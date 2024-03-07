import React, { useState, useEffect, memo } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;
import Helmet from 'react-helmet' ;

import { Swiper, SwiperSlide } from 'swiper/react' ;

import SwiperCore from 'swiper' ;
import 'swiper/swiper-bundle.css' ;

import Loader from '../../Components/Loader' ;
import Error from '../../Components/Error' ;
import { size } from '../../theme' ;

SwiperCore.use([]) ;
 
const Container = styled.div`
    height : calc(100vh - 50px) ;
    width : 100vw ;
    padding : 50px ;
    position : relative ;

    margin : 0 auto ;

    @media ${props => props.theme.mobileS} {
        position : static ;
        height : none ;
        padding : 30px ;
    }
`;

const VideoContainer = styled.div`
    width : 100% ;
    height : 50% ;
    padding : 0 5px ;

    @media ${props => props.theme.mobileS} {
        position : static ;

        z-index : 3 ;

        padding : 0 ;

        margin : 30px 0 ;

        width : 100% ;
        height : 300px ;

        float : left ;
    }
`;

const Backdrop = styled.div<{ bgImage : string }>`
    position : absolute ;
    top : 0 ;
    left : 0 ;
    z-index : -3 ;
    width : 100% ;
    height : 100% ;
    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : cover ;
    filter : blur(3px) ;
    opacity : 0.5 ;
`;

const DataContainer = styled.div<{ display : string, backgroundColor : string }>`
    display : ${props => props.display} ;
    flex : 1 ;
    padding : 0 50px 0 50px ;

    background-color : ${props => props.backgroundColor} ; 

    flex-direction : column ;

    @media ${props => props.theme.mobileS} {
        padding : 10px ;

        float : left ;

        width : 100% ;
        height : 500px ;
    }
`;

const Data = styled.div`
    width : 100% ;
    flex : 1 ;
    margin-left : 10px ;
    z-index : 2 ;

    display : block ;

    @media ${props => props.theme.mobileS} {
        margin-left : 0 ;
    }
`;

const Cover = styled.div<{ bgImage : string }>`
    width : 40% ;
    height : 100% ;
    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : cover ;

    @media ${props => props.theme.mobileS} {
        display : flex ;
        float : left ;
        width : 100% ;
        height : 100% ;
    }
`;

const Content = styled.div`
    display : flex ;
    width : 80% ;
    height : 100% ;
    z-index : 1 ;

    justify-content : center ;

    margin : 0 auto ;

    @media ${props => props.theme.mobileS} {
        width : 100% ;
        height : 500px ;
        overflow : hidden ;
        height : none ;
    }
`;

const Title = styled.h3`
    width : 100% ;
    height : 52px ;
    font-size : 48px ;
    margin-bottom : 20px ;
    position : relative ;
    z-index : 1 ;

    overflow : hidden ;
    text-overflow : ellipsis ;
    white-space : nowrap ;

    @media ${props => props.theme.mobileS} {
        font-size : 18px ;
        margin-bottom : 10px ;

        height : 32px ;
    }
`;

const ItemContainer = styled.div`
    margin-bottom : 20px ;
    position : relative ;
    z-index : 1 ;

    @media ${props => props.theme.mobileS} {
        font-size : 11px ;
    }
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin : 0 10px ;
`;

const OverView = styled.p`  
    display : -webkit-box ;
    display : -ms-flexbox ;
    display : box ;
    font-size : 16px ;
    line-height : 150% ;
    margin-bottom : 10px ;
    width : 100% ;
    height : 35% ;

    overflow : hidden ;
    vertical-align : top ;
    text-overflow : ellipsis ;
    word-break : break-all ;
    -webkit-box-orient : vertical ;
    -webkit-line-clamp : 5 ;

    @media ${props => props.theme.mobileS} {
        font-size : 12px ;
        height : auto ;
        -webkit-line-clamp : unset ;
    }
`;

const Video = styled.iframe<{ src : string, frameborder : string, allowfullscreen : boolean }>`
    width : 100% ;
    height : 100% ;
`;

const RentUl = styled.ul`
    display : flex ;
    align-items : center ;

    margin-top : 15px ;

    @media ${props => props.theme.mobileS} {
        margin-top : 10px ;
        float : left ;
    }
`;

const RentLi = styled.li`
    display : flex ;

    flex-direction : column ;
    justify-content : center ;
    align-items : center ;

    &:not(:last-child) {
        margin-right : 30px ;
    }

    @media ${props => props.theme.mobileS} {

        &:not(:last-child) {
            margin-right : 10px ;
        }
    }
`;

const RentTitle = styled.div`
    width : 100% ;

    text-align : center ;

    @media ${props => props.theme.mobileS} {
        font-size : 10px ;
    }
`;

const LogoImageWrapper = styled.div`
    width : 100% ;
    height : 80px ;
    
    display : flex ;

    align-items : center ;
    justify-content : center ;

    float : left ;
`;

const LogoImage = styled.div<{ bgImage : string }>`
    margin-top : 20px ;

    width : 70px ;
    height : 70px ;

    border-radius : 70px ;

    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : 70px 70px ;

    @media ${props => props.theme.mobileS} {
        width : 40px ;
        height : 40px ;
        margin-top : 0 ;

        border-radius : 40px ;
        background-size : 40px 40px ;
    }
`;

type DetailPresenterProps = {
    slideLoadData : any
    loading : boolean
    error : string
}

const DetailPresenter = ({ 
    slideLoadData,
    loading, 
    error
    } : DetailPresenterProps) => {

    const { mobileS } = size ;
    const [ mode468px, setMode468px ] = useState(false) ;
    const [ css, setCss ] = useState(true) ;
    const [ touchMove, setTouchMove ] = useState(false) ;
    const [ touchMoveData, setTouchMoveData ] = useState(false) ;

    function clickCover(e : React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation() ;

        touchMove ? setTouchMove(false) : setCss(true) ;
    }

    function clickData(e : React.MouseEvent<HTMLDivElement, MouseEvent>) {
        e.stopPropagation() ;

        touchMoveData ? setTouchMoveData(false) : setCss(false) ;
    }

    const viewContentNumCheck = ( innerWidth : number ) => {

        if( innerWidth <= mobileS ) {
            setMode468px(true) ;
            setCss(false) ;
        }else if( innerWidth > mobileS ) {
            setMode468px(false) ;
            setCss(true) ;
        }
    }

    const onResize = (e : UIEvent) => {
        const { currentTarget } = e ;
        const { innerWidth } = currentTarget as any ; 

        viewContentNumCheck(innerWidth) ;
    }

    useEffect(() => {

        const { innerWidth } = window ;

        viewContentNumCheck(innerWidth) ;

        window.addEventListener('resize', onResize, false) ;
    
        return () => {
          window.removeEventListener('resize', onResize, false) ;
        }
      }, []) ;

    return (
    <>
        <Helmet>
            <title>Detail | Search Media </title>
        </Helmet>
        {loading ? <Loader/> : (
            <Swiper
                spaceBetween = { 30 }
                onSlideChangeTransitionStart = { () => { if(mode468px) setCss(false) } }
                allowSlideNext = { false }
                allowSlidePrev = { false }
            >
                { slideLoadData && slideLoadData.map(( data : any, index : number ) =>  {

                    const { result, resultRent } = data ;
                    let canSee = null ;

                    if (resultRent && resultRent.JP && resultRent.JP.flatrate && resultRent.JP.buy) {
                        canSee = [...resultRent.JP.flatrate, ...resultRent.JP.buy] ;
                    }else if(resultRent && resultRent.JP && resultRent.JP.buy) {
                        canSee = [...resultRent.JP.buy] ;
                    }else if (resultRent && resultRent.JP && resultRent.JP.flatrate) {
                        canSee = [...resultRent.JP.flatrate] ;
                    }
                    
                    return (
                        <SwiperSlide key={index}>
                            <Container>
                                <Backdrop 
                                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                                />
                                <Content>
                                { !mode468px ? ( 
                                    <>
                                        <Cover  
                                            bgImage={result.poster_path ? 
                                                `https://image.tmdb.org/t/p/original${result.poster_path}` 
                                                : require("../../assets/noPoster.jpg")}
                                            onClick ={ (e) => mode468px ? clickCover(e) : null }
                                        />
                                        <DataContainer 
                                            display={ css ? 'flex' : 'none' }
                                            backgroundColor={ mode468px ? 'rgba(0, 0, 0, 0.8)' : 'none' }
                                        >
                                            <Data
                                                onClick = { (e) => mode468px ? clickData(e) : null }
                                            >
                                                <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                                                <ItemContainer>
                                                    <Item>
                                                        {result.release_date ? 
                                                        result.release_date.substring(0, 7)
                                                        : result.first_air_date.substring(0, 7)}
                                                    </Item>
                                                    <Divider>.</Divider>
                                                    <Item>
                                                        {result.runtime ? 
                                                        result.runtime 
                                                        : result.episode_run_time}min
                                                    </Item>
                                                    <Divider>.</Divider>
                                                    <Item>
                                                        { 
                                                            result.genres!.map((genre : any, index : number) => 
                                                                index === result.genres.length - 1 ? 
                                                                genre.name 
                                                                : `${genre.name} / `
                                                            )
                                                        }
                                                    </Item>
                                                </ItemContainer>
                                                <OverView>{result.overview}</OverView>
                                                <RentUl>
                                                    {canSee && canSee.map((data, index) =>
                                                        <RentLi key={index}>
                                                            <RentTitle>{data.provider_name}</RentTitle>
                                                            <LogoImageWrapper>
                                                                <LogoImage bgImage={`https://image.tmdb.org/t/p/original${data.logo_path}`}/>
                                                            </LogoImageWrapper>
                                                        </RentLi>)}
                                                </RentUl>
                                            </Data>
                                            { mode468px ? null : <VideoContainer>
                                                    <Video 
                                                        src = { result.videos.results!.length > 0 ? `https://www.youtube.com/embed/${result.videos.results[0].key}` : '' } 
                                                        frameborder = "0"
                                                        allowfullscreen
                                                    />
                                            </VideoContainer>}
                                        </DataContainer>
                                    </>
                                    ) : (
                                        <Cover  
                                            bgImage={result.poster_path ? 
                                                `https://image.tmdb.org/t/p/original${result.poster_path}` 
                                                : require("../../assets/noPoster.jpg")}
                                            onClick ={ (e) => mode468px ? clickCover(e) : null }
                                        >
                                            <DataContainer 
                                                display={ css ? 'flex' : 'none' }
                                                backgroundColor={ mode468px ? 'rgba(0, 0, 0, 0.8)' : 'none' }
                                            >
                                                <Data
                                                    onClick = { (e) => mode468px ? clickData(e) : null }
                                                >
                                                    <Title>{result.original_title ? result.original_title : result.original_name}</Title>
                                                    <ItemContainer>
                                                        <Item>
                                                            {result.release_date ? 
                                                            result.release_date.substring(0, 7)
                                                            : result.first_air_date.substring(0, 7)}
                                                        </Item>
                                                        <Divider>.</Divider>
                                                        <Item>
                                                            {result.runtime ? 
                                                            result.runtime 
                                                            : result.episode_run_time}min
                                                        </Item>
                                                        <Divider>.</Divider>
                                                        <Item>
                                                            { 
                                                                result.genres!.map((genre : any, index : number) => 
                                                                    index === result.genres.length - 1 ? 
                                                                    genre.name 
                                                                    : `${genre.name} / `
                                                                )
                                                            }
                                                        </Item>
                                                    </ItemContainer>
                                                    <OverView>{result.overview}</OverView>
                                                    <RentUl>
                                                        {canSee && canSee.map((data, index) =>
                                                            <RentLi key={index}>
                                                                <RentTitle>{data.provider_name}</RentTitle>
                                                                <LogoImageWrapper>
                                                                    <LogoImage bgImage={`https://image.tmdb.org/t/p/original${data.logo_path}`}/>
                                                                </LogoImageWrapper>
                                                            </RentLi>)}
                                                    </RentUl>
                                                </Data>
                                                { mode468px ? null : <VideoContainer>
                                                        <Video 
                                                            src = { result.videos.results!.length > 0 ? `https://www.youtube.com/embed/${result.videos.results[0].key}` : '' } 
                                                            frameborder = "0"
                                                            allowfullscreen
                                                        />
                                                </VideoContainer>}
                                            </DataContainer>
                                        </Cover>                        
                                    )}
                                </Content>
                                { mode468px ? (
                                    <VideoContainer>
                                        <Video 
                                            src={ result.videos.results!.length > 0 ? `https://www.youtube.com/embed/${result.videos.results[0].key}` : '' } 
                                            frameborder = "0"
                                            allowfullscreen
                                        />
                                    </VideoContainer>) : null}
                                { error && <Error text={error} color="red"/> }
                            </Container>
                        </SwiperSlide>
                    )
                })}
        </Swiper>)}
    </>
)} ;

DetailPresenter.propTypes = {
    result : PropTypes.object,
    loading : PropTypes.bool.isRequired,
    error : PropTypes.string,
};

export default DetailPresenter ;