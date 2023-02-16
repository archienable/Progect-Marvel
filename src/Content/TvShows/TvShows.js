import React, {useEffect, useState} from 'react';
import style from './TvShows.module.css'
import backLogo from "../../picture/Marvel_Logo.png";
import moment from "moment/moment";
import {Link, useNavigate, useSearchParams} from "react-router-dom";
import ReactPaginate from "react-paginate";
import PacmanLoader from "react-spinners/PacmanLoader";

const LIMIT = 6

const TvShows = () => {

    const [data, setData] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate();
    let [searchParams] = useSearchParams();
    const [loading, setLoading] = useState(true)

    const currentPage = searchParams.get("page") || 1

    useEffect(() => {
        tvShowsApi()
    }, [currentPage])

    async function tvShowsApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/tvshows?limit=${LIMIT}&page=${currentPage}`)
        let requestUser = await requestApi.json()
        setData(requestUser.data)
        setTotalPages(requestUser.total / LIMIT)
        setLoading(false)
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
                    <ReactPaginate
                        // nextLabel="next >"
                        onPageChange={({ selected }) => {
                            navigate(`/tvShows?page=${selected + 1}`);
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

export default TvShows;