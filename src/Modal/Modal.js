import React, {useEffect, useState} from 'react';
import './Modal.css'
import Search from "./Search/Search";
import {Link} from "react-router-dom";
import style from "../Content/Movies/Movies.module.css";

const Modal = ({active, setActive}) => {

    const [searchValue, setSearchValue] = useState('')
    const [dataMovies, setDataMovies] = useState([])
    const [dataTvShows, setDataTvShows] = useState([])

    useEffect(() => {
        moviesApi()
        tvShowsApi()
    }, [])

    async function moviesApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies`)
        let requestUser = await requestApi.json()
        setDataMovies(requestUser.data)
    }

    async function tvShowsApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/tvshows`)
        let requestUser = await requestApi.json()
        setDataTvShows(requestUser.data)
    }

    const dataFilter = () => {
        return [
            ...dataMovies.map(film => {
                return {
                    ...film,
                    flagFilm: true
                }
            }),
            ...dataTvShows
        ].filter(selectedFilm => selectedFilm.title.toLowerCase().includes(searchValue.toLowerCase()))
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <Search className='searchInput' text={searchValue} setText={setSearchValue} placeholder='enter text to search'/>
                <div className='dataContent'>
                    {
                        searchValue ? dataFilter().map(item => {
                            return (
                                <Link
                                    onClick={() => setActive(false)}
                                    to={item.flagFilm ? `/movies/${item.id}` : `/tvShows/${item.id}`}
                                    key={item.flagFilm ? `modalMovies-list-item-${item.id}` : `modalTvShows-list-item-${item.id}`}
                                >
                                    <div className='selectedFilm'>
                                        <div>
                                            {
                                                item.flagFilm ?
                                                    <svg className='svgFilm' version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="636.546px" height="636.546px" viewBox="0 0 636.546 636.546"  >
                                                        <path fill='red' d="M601.052,521.758c0,14.431-9.433,15.219-15.015,14.47l-3.948-0.875h-0.059h-0.02L432.04,503.291
                                                            c-27.385-5.835-29.67,11.669-29.815,16.259v13.041c0,28.998-23.757,52.502-53.018,52.502H89.251
                                                            c-29.266,0-53.013-23.504-53.013-52.502V344.48c0-28.979,23.747-52.483,53.013-52.483h259.956
                                                            c29.261,0,53.018,23.504,53.018,52.483v43.079c0.545,6.623,4.221,17.436,23.825,11.213l158.587-50.228
                                                            c5.271-1.352,16.415-2.334,16.415,13.459V521.758L601.052,521.758z M621.648,297.161h0.02l-150.302,51.734
                                                            c-27.346,9.413-29.641-0.604-29.777-3.346v-42.53c0-26.271-17.212-47.601-38.45-47.601H38.456C17.227,255.418,0,276.759,0,303.02
                                                            v273.507c0,26.256,17.227,47.572,38.456,47.572h364.683c21.248,0,38.432-21.326,38.432-47.572V547.78
                                                            c0.136-2.236,2.295-10.074,27.676-4.025l155.241,36.973c5.602,1.76,12.059,1.352,12.059-10.162V308.446
                                                            C636.565,293.028,626.335,295.289,621.648,297.161L621.648,297.161z"/>
                                                        <path fill='red' d="M103.182,55.405c33.263,0,60.2,26.946,60.2,60.194c0,33.263-26.937,60.194-60.2,60.194
                                                            c-33.258,0-60.194-26.932-60.194-60.194C42.987,82.352,69.924,55.405,103.182,55.405L103.182,55.405z M103.182,218.762
                                                            c56.971,0,103.158-46.182,103.158-103.162c0-56.976-46.187-103.152-103.158-103.152C46.206,12.447,0.01,58.634,0.01,115.6
                                                            C0.01,172.58,46.206,218.762,103.182,218.762L103.182,218.762z"/>
                                                        <path fill='red' d="M338.802,55.405c33.258,0,60.194,26.946,60.194,60.194c0,33.263-26.937,60.194-60.194,60.194
                                                            c-33.253,0-60.19-26.932-60.19-60.194C278.602,82.352,305.549,55.405,338.802,55.405L338.802,55.405z M338.821,218.762
                                                            c56.946,0,103.128-46.182,103.128-103.162c0-56.976-46.201-103.152-103.128-103.152c-57.005,0-103.177,46.187-103.177,103.152
                                                            C235.644,172.58,281.816,218.762,338.821,218.762L338.821,218.762z"/>
                                                    </svg>
                                                :
                                                    <svg className='svgFilm'
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        width="24"
                                                        height="24"
                                                        viewBox="0 0 24 24"
                                                        fill="none"
                                                        stroke="red"
                                                        strokeWidth="1.5"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                    >
                                                        <rect x="2" y="7" width="20" height="15" rx="2" ry="2" />
                                                        <polyline points="17 2 12 7 7 2" />
                                                    </svg>
                                            }
                                        </div>
                                        <div className='selectedTitle'>
                                            {item.title}
                                        </div>
                                    </div>
                                </Link>
                            )
                        }) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;