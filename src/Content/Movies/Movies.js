import React, {useEffect, useState} from 'react';
import style from './Movies.module.css'
import backLogo from '../../picture/Marvel_Logo.png'
import moment from 'moment';
import {Link, useNavigate, useParams, useSearchParams} from "react-router-dom";
import ReactPaginate from 'react-paginate';

const LIMIT = 12

const Movies = () => {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();

    const currentPage = searchParams.get("page") || 1



    useEffect(() => {
        setData([])
        fetch(`https://mcuapi.herokuapp.com/api/v1/movies?limit=${LIMIT}&page=${currentPage}`)
        .then(res => res.json())
        .then(data => {
            setData(data.data)
            setTotalPages(data.total / LIMIT)
        })
    },[currentPage])

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
                        // renderOnZeroPageCount={null}
                    />
            </div>
        </div>
    );
};

export default Movies;

