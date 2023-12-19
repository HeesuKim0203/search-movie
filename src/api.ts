import axios from 'axios' ;

const api = axios.create({
    baseURL : 'https://api.themoviedb.org/3/',
}) ;

const KEY = process.env.REACT_APP_API_PUBLIC_KEY ;

export const MoviesApi = {
    nowPlaying : () => api.get(`movie/now_playing?api_key=${KEY}&language=ja-JP`),
    upcoming : () => api.get(`movie/upcoming?api_key=${KEY}&language=ja-JP`),
    popular : () => api.get(`movie/popular?api_key=${KEY}&language=ja-JP`),
    movieDetail : id => api.get(`movie/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`),
    getRent : id => api.get(`movie/${id}/watch/providers?api_key=${KEY}&language=ja-JP`),
    search : trem => api.get(`search/movie?api_key=${KEY}&language=ja-JP&query=${encodeURIComponent(trem)}`)
} ;

export const TVApi = {
    topRated : () => api.get(`tv/top_rated?api_key=${KEY}&language=ja-JP`),
    popular : () => api.get(`tv/popular?api_key=${KEY}&language=ja-JP`),
    airingToday : () => api.get(`tv/airing_today?api_key=${KEY}&language=ja-JP`),
    showDetail : id => api.get(`tv/${id}?api_key=${KEY}&language=en-US&append_to_response=videos`),
    getRent : id => api.get(`tv/${id}/watch/providers?api_key=${KEY}&language=ja-JP`),
    search : trem => api.get(`search/tv?api_key=${KEY}&language=ja-JP&query=${encodeURIComponent(trem)}`)
} ;