import React, {useState} from 'react';
import style from './Header.module.css'
import Svg from "./Svg/Svg";
import {NavLink} from "react-router-dom";
import Modal from "../Modal/Modal";

const Header = () => {

    const [modalActive, setModalActive] = useState(false)

    return (
        <div className={style.header}>
            <NavLink to='/'><Svg /></NavLink>
            <nav className={style.nav}>
                <div className={style.item}>
                    <NavLink to='/movies' className={style.movies}>MOVIES</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to='/tvShows' className={style.tvShows}>TV SHOWS</NavLink>
                </div>
                <div className={style.item}>
                    <NavLink to='/favorites' className={style.favorites}>FAVORITES</NavLink>
                </div>
                <button onClick={() => setModalActive(true)}>
                    open modal
                </button>
            </nav>
            <Modal active={modalActive} setActive={setModalActive} />
        </div>
    );
};

export default Header;

// className={({ isActive }) => isActive ? style.activeLink : undefined}