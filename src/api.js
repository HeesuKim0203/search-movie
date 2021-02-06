import axios from 'axios' ;

const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
}) ;

const KEY = '4588cb8b75a10863fd9c6530730a127b' ;

export const MoviesApi = {
    nowPlaying : () => api.get(`movie/now_playing?api_key=${KEY}&language=ko-KR`),
    upcoming : () => api.get(`movie/upcoming?api_key=${KEY}&language=ko-KR`),
    popular : () => api.get(`movie/popular?api_key=${KEY}&language=ko-KR`),
    movieDetail : id => api.get(`movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`),
    search : trem => api.get(`search/movie?api_key=${KEY}&language=ko-KR&query=${encodeURIComponent(trem)}`)
} ;

export const TVApi = {
    topRated : () => api.get(`tv/top_rated?api_key=${KEY}&language=ko-KR`),
    popular : () => api.get(`tv/popular?api_key=${KEY}&language=ko-KR`),
    airingToday : () => api.get(`tv/airing_today?api_key=${KEY}&language=ko-KR`),
    showDetail : id => api.get(`tv/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`),
    search : trem => api.get(`search/tv?api_key=${KEY}&language=ko-KR&query=${encodeURIComponent(trem)}`)
} ;