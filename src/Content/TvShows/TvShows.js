import React, {useEffect, useState} from 'react';
import style from './TvShows.module.css'
import backLogo from "../../picture/Marvel_Logo.png";
import moment from "moment/moment";
import {Link} from "react-router-dom";


const TvShows = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        tvShowsApi()
    }, [])

    async function tvShowsApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/tvshows`)
        let requestUser = await requestApi.json()
        setData(requestUser.data)
    }

    return (
        <div>
            <div className={style.jpeg} style={{backgroundImage: `url(https://cdn.marvel.com/content/1x/iamgroot_lob_mas_dsk_04.jpg)`}}></div>
            <div className={style.containerTvShows}>
                <h2>MARVEL TV SHOWS</h2>
                <div className={style.contentTvShows}>
                    {data.map( show => {
                        return (
                            <Link className={style.link} to={`/tvShows/${show.id}`}>
                                <div className={style.show} >
                                    <div className={style.backShow}>
                                        <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                            <div className={style.img} style={{backgroundImage: `url(${show.cover_url})`}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={style.title}>{show.title}</div>
                                        <div className={style.date}>{moment(show.release_date).format("YYYY")}</div>
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default TvShows;