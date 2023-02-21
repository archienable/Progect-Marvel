import React, {useEffect, useState} from 'react';
import style from './Movies.module.css'
import backLogo from '../../picture/Marvel_Logo.png'
import moment from 'moment';
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';
import PacmanLoader from "react-spinners/PacmanLoader";

const LIMIT = 12

const Movies = () => {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)
    const [newData, setNewData] = useState(JSON.parse(localStorage.getItem('FavoritesMovies')) || [])

    const currentPage = searchParams.get("page") || 1

    useEffect(() => {
        setData([])
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies?limit=${LIMIT}&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            setData(data.data)
            setTotalPages(data.total / LIMIT)
            setLoading(false)
        })
    },[currentPage])

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

    return (
        <div>
            <div className={style.jpeg} style={{backgroundImage: `url(https://i.pinimg.com/originals/fa/d7/7e/fad77edca39069924afaf3d0df020e30.jpg)`}}></div>
            <div className={style.containerMovies}>
                <h2>MARVEL MOVIES</h2>
                <div className={style.contentMovies}>
                    {data.map( film => {

                        const result = newData.find(favoriteFilm => {
                            return favoriteFilm.id === film.id
                        })

                        const favorites = (selectedFilm) => {
                            if (result) {
                                const upData =  [...newData].filter(film => film.id !== selectedFilm.id)
                                localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
                                setNewData(upData)
                            } else {
                                const upData =  [...newData, selectedFilm]
                                localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
                                setNewData(upData)
                            }
                        }

                        return (
                            <Link className={style.link} to={`/movies/${film.id}`} >
                        {/*<Link className={style.link} to={`/movies/${film.id}`}>*/}
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
                                                <path fill="none" stroke="#40396e" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M26.5,10.5h47	c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                                            </svg>
                                        </div>
                                        <div className={style.date}>{moment(film.release_date).format("D MMM YYYY")}</div>
                                    </div>
                                </div>
                            </Link>
                    )
                    })}
                </div>
                    <ReactPaginate
                        // nextLabel="next >"
                        onPageChange={({ selected }) => {
                            navigate(`/movies?page=${selected + 1}`);
                        }}
                        forcePage={Number(currentPage) - 1}
                        pageRangeDisplayed={2}
                        pageCount={totalPages}
                        previousLabel="Prev"
                        activeLinkClassName={style.activeLinkPageRed}

                    />
            </div>
        </div>
    );
};

export default Movies;

