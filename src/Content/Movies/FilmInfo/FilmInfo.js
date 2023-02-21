import React, {useEffect, useState} from 'react';
import style from './FilmInfo.module.css'
import {useParams} from "react-router-dom";
import backLogo from "../../../picture/Marvel_Logo.png";
import RelatedMovies from "../../RelatedMovies/RelatedMovies";
import PacmanLoader from "react-spinners/PacmanLoader";


const FilmInfo = () => {

    const {film} = useParams()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [newData, setNewData] = useState(JSON.parse(localStorage.getItem('FavoritesMovies')) || [])


    useEffect(() => {
        fetchMcu()
    },[film])

    async function fetchMcu () {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies/${film}`)
        let requestUser = await requestApi.json()
        setData(requestUser)
        setLoading(false)
    }

    const result = newData.find(film => {
        return film.id === data.id
    })

    const favorites = () => {
        if (result) {
            const upData =  [...newData].filter(film => film.id !== data.id)
            localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
            setNewData(upData)
        } else {
            const upData =  [...newData, data]
            localStorage.setItem('FavoritesMovies', JSON.stringify(upData))
            setNewData(upData)
        }
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

    let trailerUrl = data.trailer_url
    if (trailerUrl && trailerUrl.includes('https://youtu.be')) {
        trailerUrl = trailerUrl.replace('https://youtu.be', 'https://www.youtube.com/embed')
    }

    return (
        <div className={style.containerFilm}>
            <div className={style.contentFilm}>
                <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                    <div className={style.img} style={{backgroundImage: `url(${data.cover_url})`}}></div>
                </div>
                <div className={style.containerInfo}>
                    <div className={style.title}>Title: <span className={style.titleName}>{data.title}</span></div>
                    <div className={style.favorite} onClick={favorites}>
                        <svg className={style.svg} xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 100 100" width="50px" height="50px">
                            <path d="M24.501,98.001c-1.021,0-2.042-0.245-2.952-0.709C19.361,96.179,18,93.959,18,91.5v-75	C18,10.701,22.701,6,28.5,6h47C81.299,6,86,10.701,86,16.5v75.501c0,3.314-2.686,6-5.999,6h0c-1.299,0-2.562-0.421-3.601-1.2L50,77	l3.011,1.949L28.322,96.757C27.215,97.567,25.889,98.001,24.501,98.001z" opacity=".35"/>
                            <path fill="black" d="M22.501,96.001c-1.021,0-2.042-0.245-2.952-0.709C17.361,94.179,16,91.959,16,89.5v-75	C16,8.71,20.71,4,26.5,4h47C79.29,4,84,8.71,84,14.5v75c0,2.459-1.361,4.679-3.552,5.793C79.54,95.756,78.521,96,77.5,96	c-1.387,0-2.712-0.432-3.831-1.249L50,77.537l-23.678,17.22C25.215,95.567,23.889,96.001,22.501,96.001z"/>
                            <path fill={result ? 'red' : "white"} d="M26.5,10.5h47c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                            <path fill="none" stroke="#40396e" stroke-linejoin="round" stroke-miterlimit="10" stroke-width="3" d="M26.5,10.5h47	c2.209,0,4,1.791,4,4v75L50,69.5l-27.5,20v-75C22.5,12.291,24.291,10.5,26.5,10.5z"/>
                        </svg>
                        Favorites
                    </div>
                    <div className={style.infoFilm}>
                        <div className={style.title}>Release date: <span className={style.titleName}>{data.release_date}</span> </div>
                        <div className={style.title}>Duration: <span className={style.titleName}>{data.duration} min</span> </div>
                        <div className={style.title}>Directed by: <span className={style.titleName}>{data.directed_by}</span></div>
                        <div className={style.title}>Phase: <span className={style.titleName}>{data.phase}</span></div>
                        <div className={style.title}>Saga: <span className={style.titleName}>{data.saga}</span></div>
                        <div className={style.title}>Chronology: <span className={style.titleName}>{data.chronology}</span></div>
                        <div className={style.title}>Post credit scenes: <span className={style.titleName}>{data.post_credit_scenes}</span></div>
                        <div className={style.title}>Overview: <span className={style.titleName}>{data.overview}</span></div>
                    </div>
                </div>
            </div>
            {trailerUrl ?
                <iframe className={style.video} width="800" height="400" src={trailerUrl} />
                :
                <div>movie expected</div>
            }
            <RelatedMovies relatedFilms={data.related_movies}/>
        </div>
    );
}

export default FilmInfo;