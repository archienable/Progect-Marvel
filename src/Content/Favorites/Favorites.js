import React, {useState} from 'react';
import style from './Favorites.module.css'
import backLogo from "../../picture/Marvel_Logo.png";
import {Link} from "react-router-dom";

const Favorites = () => {

    const [data, setData] = useState(JSON.parse(localStorage.getItem('Favorites')) || [])
    console.log('ARTEM', data)


    return (
        <div className={style.containerFilm}>
            <h2>Favorites movies</h2>
            <div className={style.contentFilm}>
                {data.map( film => {
                    return (
                        <Link className={style.link} to={`/movies/${film.id}`}>
                            <div className={style.film}>
                                <div className={style.backFilm}>
                                    <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                        <div className={style.img} style={{backgroundImage: `url(${film.cover_url})`}}></div>
                                    </div>
                                </div>
                                <div className={style.title}>{film.title}</div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </div>
    );
};

export default Favorites;