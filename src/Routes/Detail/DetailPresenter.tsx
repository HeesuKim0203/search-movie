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
    width : 100% ;
    position : relative ;
    padding : 50px ;

    margin : 0 auto ;

    @media ${props => props.theme.mobileS} {
        position : static ;
        height : none ;
        padding : 30px ;
    }
`;

const VideoContainer = styled.div`
    position : absolute ;
    width : 50% ;
    height : 50% ;
    padding : 0 5px ;
    z-index : 0 ;
    bottom : 0 ;
    right : 120px ;

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

const Backdrop = styled.div`
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

const Data = styled.div`
    width : 50% ;
    margin-left : 10px ;
    position : absolute ;
    left : 600px ;
    top : 0 ;
    z-index : 2 ;
    background-color : ${props => props.backgroundColor} ; 

    display : ${props => props.display} ;

    @media ${props => props.theme.mobileS} {
        position : static ;

        width : 100% ;
        height : 100% ;

        float : left ;

        padding : 10px ;
        margin-left : 0 ;
    }
`;

const Cover = styled.div`
    width : 40% ;
    height : 100% ;
    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : cover ;

    @media ${props => props.theme.mobileS} {
        float : left ;
        width : 100% ;
        height : 100% ;
    }
`;

const Content = styled.div`
    display : flex ;
    width : 80% ;
    height : 100% ;
    position : relative ;  
    z-index : 1 ;

    margin : 0 auto ;

    @media ${props => props.theme.mobileS} {
        width : 100% ;
        height : 500px ;
        overflow : hidden ;
        height : none ;
    }
`;

const Title = styled.h3`
    font-size : 32px ;
    margin-bottom : 20px ;
    position : relative ;
    z-index : 1 ;

    @media ${props => props.theme.mobileS} {
        font-size : 18px ;
        margin-bottom : 10px ;
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
    position : relative ;
    font-size : 12px ;
    line-height : 1.5 ;
    margin-bottom : 10px ;
    z-index : 1 ;

    @media ${props => props.theme.mobileS} {
        font-size : 12px ;
    }
`;

const Video = styled.iframe`
    width : 100% ;
    height : 100% ;
`;

const RentUl = styled.ul`
    display : flex ;
    align-items : center ;

    margin-top : 30px ;

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

const LogoImage = styled.div`
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

const DetailPresenter = ({ 
    slideLoadData,
    loading, 
    error
    }) => {

    const { mobileS } = size ;
    const [ mode468px, setMode468px ] = useState(false) ;
    const [ css, setCss ] = useState(true) ;
    const [ touchMove, setTouchMove ] = useState(false) ;
    const [ touchMoveData, setTouchMoveData ] = useState(false) ;

    function touchMoveInit(e) {
        e.stopPropagation() ;

        setTouchMove(true) ;
    }

    function touchMoveInitData(e) {
        e.stopPropagation() ;

        setTouchMoveData(true) ;
    }

    function clickCover(e) {
        e.stopPropagation() ;

        touchMove ? setTouchMove(false) : setCss(true) ;
    }

    function clickData(e) {
        e.stopPropagation() ;

        touchMoveData ? setTouchMoveData(false) : setCss(false) ;
    }

    const viewContentNumCheck = innerWidth => {
        if( innerWidth <= mobileS ) {
            setMode468px(true) ;
            setCss(false) ;
        }else if( innerWidth > mobileS ) {
            setMode468px(false) ;
            setCss(true) ;
        }
    }

    const onResize = (e) => {
        const { currentTarget : { innerWidth } } = e ;

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
            >
                { slideLoadData && slideLoadData.map(( data, index ) =>  {

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
                        <SwiperSlide key={index} width="none" height="none">
                            <Container>
                                <Backdrop 
                                    bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
                                />
                                <Content>
                                    <Cover  
                                        bgImage={result.poster_path ? 
                                            `https://image.tmdb.org/t/p/original${result.poster_path}` 
                                            : require("../../assets/noPoster.jpg")}
                                        onTouchMove={ touchMoveInit }
                                        onTouchEnd={ mode468px ? clickCover : null }
                                    >
                                    <Data 
                                        display={ css ? 'block' : 'none' }
                                        backgroundColor={ mode468px ? 'rgba(0, 0, 0, 0.8)' : 'none' }
                                        onTouchMove={ touchMoveInitData }
                                        onTouchEnd={ mode468px ? clickData : null }
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
                                                : result.episode_run_time}분
                                            </Item>
                                            <Divider>.</Divider>
                                            <Item>
                                                {result.genres && 
                                                result.genres.map((genre, index) => 
                                                    index === result.genres.length - 1 ? 
                                                    genre.name 
                                                    : `${genre.name} / `
                                                )}
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
                                    </Cover>
                                    { mode468px ? null : <VideoContainer>
                                            <Video 
                                                src = { result.videos.results &&  result.videos.results.length > 0 && `https://www.youtube.com/embed/${result.videos.results[0].key}`} 
                                                frameborder = "0"
                                                allowfullscreen
                                            />
                                    </VideoContainer>}
                                </Content>
                                { mode468px ? <VideoContainer>
                                            <Video 
                                                src={ result.videos.results &&  result.videos.results.length > 0 &&`https://www.youtube.com/embed/${result.videos.results[0].key}`} 
                                                frameborder = "0"
                                                allowfullscreen
                                            />
                                    </VideoContainer> : null }
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