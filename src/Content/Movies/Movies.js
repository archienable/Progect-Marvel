import React, {useEffect, useState} from 'react';
import style from './Movies.module.css'
import backLogo from '../../picture/Marvel_Logo.png'
import moment from 'moment';
import {Link} from "react-router-dom";



const Movies = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies`)
        .then(res => res.json())
        .then(data => setData(data.data))

    },[])

    return (
        <div>
            <div className={style.jpeg} style={{backgroundImage: `url(https://i.pinimg.com/originals/fa/d7/7e/fad77edca39069924afaf3d0df020e30.jpg)`}}></div>
            <div className={style.containerMovies}>
                <h2>MARVEL MOVIES</h2>
                <div className={style.contentMovies}>
                    {data.map( film => {
                        return (
                            <Link className={style.link} to={`/movies/${film.id}`}>
                                <div className={style.film} >
                                    <div className={style.backFilm}>
                                        <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                            <div className={style.img} style={{backgroundImage: `url(${film.cover_url})`}}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className={style.title}>{film.title}</div>
                                        <div className={style.date}>{moment(film.release_date).format("D MMM YYYY")}</div>
                                    </div>
                                </div>
                            </Link>
                    )
                    }).reverse()}
                </div>
            </div>
        </div>
    );
};

export default Movies;

