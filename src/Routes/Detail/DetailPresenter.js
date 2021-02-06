import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components' ;
import Helmet from 'react-helmet' ;

import Loader from '../../Components/Loader' ;
import Error from '../../Components/Error' ;

const Container = styled.div`
    height : calc(100vh - 50px) ;
    width : 100% ;
    position : relative ;
    padding : 50px ;
`;

const VideoContainer = styled.div`
    position : absolute ;
    width : 70% ;
    height : 100% ;
    padding : 0 5px ;
    z-index : 0 ;
    top : 0 ;
    right : 0 ;
`;

const Backdrop = styled.div`
    position : absolute ;
    top : 0 ;
    left : 0 ;
    width : 100% ;
    height : 100% ;
    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : cover ;
    filter : blur(3px) ;
    opacity : 0.5 ;
`;

const Data = styled.div`
    width : 28% ;
    margin-left : 10px ;
    position : absolute ;
    top : 10px ;
    left : 0 ;
    opacity : 0 ;
`;

const Cover = styled.div`
    width : 30% ;
    height : 100% ;
    background-image : url(${props => props.bgImage}) ;
    background-position : center center ;
    background-size : cover ;
`;

const Content = styled.div`
    display : flex ;
    width : 100% ;
    height : 100% ;
    position : relative ;  
    z-index : 1 ;
    &:hover {
        ${Data} {
            opacity : 1 ;
        }
        ${Cover} {
            filter : brightness(20%) ; 
        }
    }
`;

const Title = styled.h3`
    font-size : 32px ;
    margin-bottom : 20px ;
    position : relative ;
    z-index : 1 ;
`;

const ItemContainer = styled.div`
    margin-bottom : 20px ;
    position : relative ;
    z-index : 1 ;
`;

const Item = styled.span`

`;

const Divider = styled.span`
    margin : 0 10px ;
`;

const OverView = styled.p`
    position : relative ;
    font-size : 12px ;
    opacity : 0.8 ;
    line-height : 1.5 ;
    margin-bottom : 10px ;
    z-index : 1 ;
`;

const Video = styled.iframe`
    width : 100% ;
    height : 100% ;
`;

const DetailPresenter = ({ result, loading, error }) => (
    <>
        <Helmet>
            <title>Detail | I flix</title>
        </Helmet>
        {loading ? <Loader/> : (
        <Container>
            <Backdrop 
                bgImage={`https://image.tmdb.org/t/p/original${result.backdrop_path}`}
            />
            <Content>
                <Cover  
                    bgImage={result.poster_path ? 
                        `https://image.tmdb.org/t/p/original${result.poster_path}` 
                        : require("../../assets/noPoster.jpg")}
                />
                <Data>
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
                </Data>
                <VideoContainer>
                        <Video 
                            src={ result.videos.results &&  result.videos.results.length > 0 &&`https://www.youtube.com/embed/${result.videos.results[0].key}`} 
                            frameborder = "0"
                            allowfullscreen
                        />
                </VideoContainer>
            </Content>
            { error && <Error text={error} color="red"/> }
        </Container>)}
    </>
) ;

DetailPresenter.propTypes = {
    result : PropTypes.object,
    loading : PropTypes.bool.isRequired,
    error : PropTypes.string,
};

export default DetailPresenter;