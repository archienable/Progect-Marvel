import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import style from "../../TvShows/ShowInfo/ShowInfo.module.css";

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



    console.log('SHOW', data)

    return (
        <div className={style.containerShow}>
            <div className={style.contentShow}>
                <div className={style.backImg}>
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
            <iframe className={style.video} width="800" height="400" src={data.trailer_url} />
        </div>
    );
};

export default ShowInfo;