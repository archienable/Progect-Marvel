import React, {useEffect, useState} from 'react';
import style from './Movies.module.css'
import bannerTwo from '../../picture/bannerTwo.webp'
import backLogo from '../../picture/Marvel_Logo.png'


const Movies = () => {

    const [data, setData] = useState([])

    useEffect(() => {
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies`)
        .then(res => res.json())
        .then(data => setData(data.data))

    },[])

    console.log(data)

    console.log(bannerTwo)

    return (
        <div>
            {/*<div className={style.jpeg} style={{backgroundImage: `url(${bannerTwo})`}}></div>*/}
            {/*<div className={style.jpeg} style={{backgroundImage: `url(https://i.pinimg.com/originals/fa/d7/7e/fad77edca39069924afaf3d0df020e30.jpg)`}}></div>*/}
            <div className={style.jpeg} style={{backgroundImage: `url(https://cdn.shopify.com/s/files/1/2491/1072/collections/MARVEL_1920x450_b691539a-a0cb-4a43-8d20-ca9d567ab290_1920x450.jpg?v=1581967770)`}}></div>
            <div className={style.containerMovies}>
                <h2>MARVEL MOVIES</h2>
                <div className={style.contentMovies}>
                    {data.map( film => {
                        return (
                            <div className={style.film}>
                                <div className={style.backFilm}>
                                    <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                        <div className={style.img} style={{backgroundImage: `url(${film.cover_url})`}}></div>
                                    </div>
                                </div>
                                <div>
                                    <div className={style.title}>{film.title}</div>
                                    <div className={style.date}>{film.release_date}</div>
                                </div>
                            </div>
                    )
                    }).reverse()}
                </div>
            </div>
        </div>
    );
};

export default Movies;

// <div className={style.title}>Duration: <span className={style.info}>{film.duration}</span> min. </div>
// <div className={style.title}>Post credit scenes: <span className={style.info}>{film.post_credit_scenes}</span> </div>
// <div className={style.title}>Directed_by: <span className={style.info}>{film.directed_by}</span> </div>
// <div className={style.title}>Phase: <span className={style.info}>{film.phase}</span></div>
// <div className={style.title}>Saga: <span className={style.info}>{film.saga}</span></div>
// <div className={style.title}>Overview: <span className={style.info}>{film.overview}</span></div>