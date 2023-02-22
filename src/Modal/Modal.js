import React, {useEffect, useState} from 'react';
import './Modal.css'
import Search from "./Search/Search";
import {Link} from "react-router-dom";
import style from "../Content/Movies/Movies.module.css";

const Modal = ({active, setActive}) => {

    const [searchValue, setSearchValue] = useState('')
    const [data, setData] = useState([])

    useEffect(() => {
        moviesApi()
    }, [])

    async function moviesApi() {
        let requestApi = await fetch(`https://mcuapi.herokuapp.com/api/v1/movies`)
        let requestUser = await requestApi.json()
        setData(requestUser.data)
    }

    const dataFilter = () => {
        return data.filter(selectedFilm => selectedFilm.title.toLowerCase().includes(searchValue.toLowerCase()))
    }

    return (
        <div className={active ? 'modal active' : 'modal'} onClick={() => setActive(false)}>
            <div className={active ? 'modalContent active' : 'modalContent'} onClick={e => e.stopPropagation()}>
                <Search className='searchInput' text={searchValue} setText={setSearchValue} placeholder='enter text to search'/>
                <div className='dataContent'>
                    {
                        searchValue ? dataFilter().map(item => {
                            return (
                                <Link to={`/movies/${item.id}`} >
                                    <div className='selectedTitle'>
                                        {item.title}
                                    </div>
                                </Link>
                            )
                        }) : null
                    }
                </div>
            </div>
        </div>
    );
};

export default Modal;