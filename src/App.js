import React from 'react';
import Header from "./Header/Header";
import './App.css'
import HomePage from "./Content/HomePage/HomePage";
import Movies from "./Content/Movies/Movies";
import TvShows from "./Content/TvShows/TvShows";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import FilmInfo from "./Content/Movies/FilmInfo/FilmInfo";
import ShowInfo from "./Content/TvShows/ShowInfo/ShowInfo";

function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <Header />
                    <div className='Container'>
                        <Routes>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/movies' element={<Movies />} />
                            <Route path='/tvShows' element={<TvShows />} />
                            <Route path='/movies/:film' element={<FilmInfo />} />
                            <Route path='/tvShows/:show' element={<ShowInfo />} />
                        </Routes>
                    </div>
                <div>
                    FOOTER
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;
