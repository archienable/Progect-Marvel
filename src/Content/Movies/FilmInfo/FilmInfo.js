import React, {useEffect, useState} from 'react';
import style from './FilmInfo.module.css'
import {useParams} from "react-router-dom";
import backLogo from "../../../picture/Marvel_Logo.png";
import RelatedMovies from "../../RelatedMovies/RelatedMovies";
import PacmanLoader from "react-spinners/PacmanLoader";
import Favorites from "../../Favorites/Favorites";

// function OnClick() {
//     return null;
// }

const FilmInfo = () => {

    const {film} = useParams()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)
    const [newData, setNewData] = useState(JSON.parse(localStorage.getItem('Favorites')) || [])


    useEffect(() => {
        fetchMcu()
    },[])

    async function fetchMcu () {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies/${film}`)
        let requestUser = await requestApi.json()
        setData(requestUser)
        setLoading(false)
    }

    let styleFavorite = `${style.favorite} `
    const result = newData.find(film => {
        return film.id === data.id
    })

    if (result) {
        styleFavorite += style.favSuccess
    }

    const favorites = () => {
        const upData =  [...newData, data]
        localStorage.setItem('Favorites', JSON.stringify(upData))
        setNewData(upData)
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
                    <div className={style.title}>Title: <span className={style.info}>{data.title}</span></div>
                    <div className={styleFavorite} onClick={favorites}>Favorites</div>
                    <div className={style.title}>Release date: <span className={style.info}>{data.release_date}</span> </div>
                    <div className={style.title}>Duration: <span className={style.info}>{data.duration} min</span> </div>
                    <div className={style.title}>Directed by: <span className={style.info}>{data.directed_by}</span></div>
                    <div className={style.title}>Phase: <span className={style.info}>{data.phase}</span></div>
                    <div className={style.title}>Saga: <span className={style.info}>{data.saga}</span></div>
                    <div className={style.title}>Chronology: <span className={style.info}>{data.chronology}</span></div>
                    <div className={style.title}>Post credit scenes: <span className={style.info}>{data.post_credit_scenes}</span></div>
                    <div className={style.title}>Overview: <span className={style.info}>{data.overview}</span></div>
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