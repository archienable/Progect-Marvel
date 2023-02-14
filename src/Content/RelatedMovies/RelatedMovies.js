import React from 'react';
import backLogo from "../../picture/Marvel_Logo.png";
import style from "../RelatedMovies/RelatedMovies.module.css"
import {Link} from "react-router-dom";
import Swiper from 'react-id-swiper';
import 'swiper/swiper.css'

const RelatedMovies = ({relatedFilms}) => {


    const params = {
        slidesPerView: 3,
        spaceBetween: 10,
        slidesPerGroup: 1,
        breakpoints: {
            500: {
                slidesPerView: 5,
                slidesPerGroup: 3
            }
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: style.swiperButtonNext,
            prevEl: style.swiperButtonPrev
        }
    }

    return (
        <div className={style.containerRelated}>
            <h2>RELATED MOVIES</h2>
            <div className={style.contentRelated}>
                <Swiper {...params}>
                    {relatedFilms.map(film => {
                        return (
                            <Link className={style.link} to={`/movies/${film.id}`}>
                                <div className={style.relatedFilm}>
                                    <div className={style.backImg} style={{backgroundImage: `url(${backLogo})`}}>
                                        <div className={style.img} style={{backgroundImage: `url(${film.cover_url})`}}></div>
                                    </div>
                                    <div className={style.title}>{film.title}</div>
                                </div>
                            </Link>
                        )
                    })}
                </Swiper>
            </div>
        </div>
    );
};

export default RelatedMovies;
