import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "../../TvShows/ShowInfo/ShowInfo.module.css";
import backLogo from "../../../picture/Marvel_Logo.png";

const ShowInfo = () => {

    const {show} = useParams()

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchMcu ()
    }, [])


    async function fetchMcu () {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/tvshows/${show}`)
        let requestUser = await requestApi.json()
        setData(requestUser)
        setLoading(false)
    }

    if (loading) {
        return <div>loading</div>
    }

    let trailerUrl = data.trailer_url
    if (trailerUrl && trailerUrl.includes('https://youtu.be')) {
        trailerUrl = trailerUrl.replace('https://youtu.be', 'https://www.youtube.com/embed')
    }

    console.log('SHOW', data)

    return (
        <div className={style.containerShow}>
            <div className={style.contentShow}>
                <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                    <div className={style.img} style={{backgroundImage: `url(${data.cover_url})`}}></div>
                </div>
                <div className={style.containerInfo}>
                    <div className={style.title}>Title: <span className={style.info}>{data.title}</span></div>
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
            <div className={style.backVideo} style={{backgroundImage: `url(${backLogo})`}}>
                <iframe className={style.video} src={trailerUrl} />
            </div>
        </div>
    );
};

export default ShowInfo;