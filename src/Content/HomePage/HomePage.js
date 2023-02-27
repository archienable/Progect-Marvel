import React, {useEffect, useState} from 'react';
import style from './HomePage.module.css'
import Favorites from "../Favorites/Favorites";
import PacmanLoader from "react-spinners/PacmanLoader";
import backLogo from "../../picture/Marvel_Logo.png";
import moment from "moment";
import {Link} from "react-router-dom";
// import Swiper from "react-id-swiper";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';

const LIMIT = 10

const HomePage = () => {

    const [dataMovies, setDataMovies] = useState([])
    const [dataShows, setDataShows] = useState([])
    const [loading, setLoading] = useState(true)
    const [newDataMovies, setNewDataMovies] = useState(JSON.parse(localStorage.getItem('FavoritesMovies')) || [])
    const [newDataShows, setNewDataShows] = useState(JSON.parse(localStorage.getItem('FavoritesTvShows')) || [])

    useEffect(() => {
        moviesApi()
        tvShowsApi()
    }, [])

    async function moviesApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies?limit=${LIMIT}`)
        let requestUser = await requestApi.json()
        setDataMovies(requestUser.data)
        setLoading(false)
    }

    async function tvShowsApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/tvshows?limit=${LIMIT}`)
        let requestUser = await requestApi.json()
        setDataShows(requestUser.data)
        setLoading(false)
    }

    const override = {
        display: "block",
        speedMultiplier: 1,
        margin: "0 auto",
    };

    if (loading) {
        return <PacmanLoader
            color="red"
            loading
            cssOverride={override}
            size={50}
            speedMultiplier={2}
        />
    }

    const params = {
        slidesPerView: 6,
        spaceBetween: 10,
        slidesPerGroup: 1,
        pagination: {
            // type: "fraction",
            clickable: true,
        },
        navigation: true,
        cssMode: true,
        modules: [Pagination, Navigation],
    }

    return (
        <div className={style.containerHomePage}>
            <div className={style.pictures} style={{backgroundImage: `url(https://cdn.marvel.com/content/1x/antmanandthewaspquantumania_lob_mas_dsk_03.jpg)`}}></div>
            {/*<Favorites />*/}
                <div className={style.containerFilm} >
                    <h2>FIRST 10 MOVIES</h2>
                    <div className={style.contentFilms}>
                        <Swiper {...params}>
                            {dataMovies.map( film => {

                                const result = newDataMovies.find(favoriteFilm => {
                                    return favoriteFilm.id === film.id
                                })

                                const favorites = (selectedFilm) => {
                                    if (result) {
                                        const upData =  [...newDataMovies].filter(film => film.id !== selectedFilm.id)
                                        localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
                                        setNewDataMovies(upData)
                                    } else {
                                        const upData =  [...newDataMovies, selectedFilm]
                                        localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
                                        setNewDataMovies(upData)
                                    }
                                }

                                return (
                                    <SwiperSlide key={`tenMovies-list-item-${film.id}`}>
                                        <Link className={style.link} to={`/movies/${film.id}`} >
                                            <div className={style.film} >
                                                <div className={style.backFilm}>
                                                    <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                                        <div className={style.img} style={{backgroundImage: `url(${film.cover_url})`}}></div>
                                                    </div>
                                                </div>
                                                <div className={style.infoFilm}>
                                                    <div className={style.title}>{film.title}</div>
                                                    <div className={style.favorite} onClick={(event) => {
                                                        event.preventDefault()
                                                        event.stopPropagation()
                                                        favorites(film)
                                                    }}>
                                                        <svg className={style.svg} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="20px" height="20px">
                                                            <path d="M24.501,98.001c-1.021,0-2.042-0.245-2.952-0.709C19.361,96.179,18,93.959,18,91.5v-75	C18,10.701,22.701,6,28.5,6h47C81.299,6,86,10.701,86,16.5v75.501c0,3.314-2.686,6-5.999,6h0c-1.299,0-2.562-0.421-3.601-1.2L50,77	l3.011,1.949L28.322,96.757C27.215,97.567,25.889,98.001,24.501,98.001z" opacity=".35"/>
                                                            <path fill="black" d="M22.501,96.001c-1.021,0-2.042-0.245-2.952-0.709C17.361,94.179,16,91.959,16,89.5v-75	C16,8.71,20.71,4,26.5,4h47C79.29,4,84,8.71,84,14.5v75c0,2.459-1.361,4.679-3.552,5.793C79.54,95.756,78.521,96,77.5,96	c-1.387,0-2.712-0.432-3.831-1.249L50,77.537l-23.678,17.22C25.215,95.567,23.889,96.001,22.501,96.001z"/>
                                                            <path fill={result ? 'red' : "white"} d="M26.5,10.5h47c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                                                            <path fill="none" stroke="#40396e" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M26.5,10.5h47	c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                                                        </svg>
                                                    </div>
                                                    <div className={style.date}>{moment(film.release_date).format("D MMM YYYY")}</div>
                                                </div>
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )
                            })}
                        </Swiper>
                    </div>
                </div>
            <div className={style.containerTvShows}>
                <h2>FIRST 10 TV SHOWS</h2>
                <div className={style.contentTvShows}>
                    <Swiper {...params}>
                        {dataShows.map( show => {
                            const result = newDataShows.find(favoriteFilm => {
                                return favoriteFilm.id === show.id
                            })

                            const favorites = (selectedFilm) => {
                                if (result) {
                                    const upData =  [...newDataShows].filter(film => film.id !== selectedFilm.id)
                                    localStorage.setItem('FavoritesTvShows', JSON.stringify(upData))
                                    setNewDataShows(upData)
                                } else {
                                    const upData =  [...newDataShows, selectedFilm]
                                    localStorage.setItem('FavoritesTvShows', JSON.stringify(upData))
                                    setNewDataShows(upData)
                                }
                            }
                            return (
                                <SwiperSlide key={`tenTvShows-list-item-${show.id}`}>
                                    <Link className={style.link} to={`/tvShows/${show.id}`} >
                                        <div className={style.show} >
                                            <div className={style.backShow}>
                                                <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                                    <div className={style.img} style={{backgroundImage: `url(${show.cover_url})`}}></div>
                                                </div>
                                            </div>
                                            <div className={style.infoShow}>
                                                <div className={style.title}>{show.title}</div>
                                                <div className={style.favorite} onClick={(event) => {
                                                    event.preventDefault()
                                                    event.stopPropagation()
                                                    favorites(show)
                                                }}>
                                                    <svg className={style.svg} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="20px" height="20px">
                                                        <path d="M24.501,98.001c-1.021,0-2.042-0.245-2.952-0.709C19.361,96.179,18,93.959,18,91.5v-75	C18,10.701,22.701,6,28.5,6h47C81.299,6,86,10.701,86,16.5v75.501c0,3.314-2.686,6-5.999,6h0c-1.299,0-2.562-0.421-3.601-1.2L50,77	l3.011,1.949L28.322,96.757C27.215,97.567,25.889,98.001,24.501,98.001z" opacity=".35"/>
                                                        <path fill="black" d="M22.501,96.001c-1.021,0-2.042-0.245-2.952-0.709C17.361,94.179,16,91.959,16,89.5v-75	C16,8.71,20.71,4,26.5,4h47C79.29,4,84,8.71,84,14.5v75c0,2.459-1.361,4.679-3.552,5.793C79.54,95.756,78.521,96,77.5,96	c-1.387,0-2.712-0.432-3.831-1.249L50,77.537l-23.678,17.22C25.215,95.567,23.889,96.001,22.501,96.001z"/>
                                                        <path fill={result ? 'red' : "white"} d="M26.5,10.5h47c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                                                        <path fill="none" stroke="#40396e" strokeLinejoin="round" strokeMiterlimit="10" strokeWidth="3" d="M26.5,10.5h47	c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                                                    </svg>
                                                </div>
                                                <div className={style.date}>{moment(show.release_date).format("YYYY")}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </SwiperSlide>
                            )
                        })}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default HomePage;