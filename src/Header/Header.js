import React from 'react';
import style from './Header.module.css'
import Svg from "./Svg/Svg";
import {NavLink} from "react-router-dom";

const Header = () => {

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
            </nav>
        </div>
    );
};

export default Header;

// className={({ isActive }) => isActive ? style.activeLink : undefined}