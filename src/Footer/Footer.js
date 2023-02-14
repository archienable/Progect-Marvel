import React from 'react';
import style from './Footer.module.css'

const Footer = () => {
    return (
        <div className={style.containerFooter}>
            <div className={style.contentFooter}>
                <svg className={style.svg} viewBox="0 0 36 52" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <rect fill="#EC1D24" width="100%" height="100%"></rect>
                    <path fill="#FEFEFE" d="M31.5 48V4H21.291l-3.64 22.735L14.102 4H4v44h8V26.792L15.577 48h4.229l3.568-21.208V48z"></path>
                </svg>
                <div className={style.blocks}>
                    <div className={style.block}>
                        <div>ABOUT MARVEL</div>
                        <div>HELP/FAQS</div>
                        <div>CAREERS</div>
                        <div>INTERNSHIPS</div>
                    </div>
                    <div className={style.block}>
                        <div>ADVERTISING</div>
                        <div>DISNEY+</div>
                        <div>MARVELHQ.COM</div>
                        <div>ADVERREDEEM DIGITAL COMICSTISING</div>
                    </div>
                    <div className={style.follow}>
                        <div className={style.block}>
                            FOLLOW MARVEL
                            <div className={style.aps}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="grey"><path fill-rule="evenodd" d="M15.441 15.993H2.206a.552.552 0 01-.552-.552V7.17H3.86c-.287.414-.384 1.185-.384 1.675 0 2.953 2.408 5.356 5.368 5.356 2.96 0 5.368-2.403 5.368-5.356 0-.49-.069-1.25-.425-1.675h2.206v8.272a.552.552 0 01-.552.552M8.844 5.458a3.39 3.39 0 013.394 3.386 3.39 3.39 0 01-3.394 3.386A3.39 3.39 0 015.45 8.844a3.39 3.39 0 013.393-3.386m4.391-3.252h1.655c.304 0 .551.247.551.551v1.655a.552.552 0 01-.551.551h-1.655a.552.552 0 01-.551-.551V2.757c0-.304.247-.551.551-.551M15.55 0H2.098A2.095 2.095 0 000 2.093v13.461c0 1.156.94 2.093 2.098 2.093h13.451a2.095 2.095 0 002.098-2.093V2.093C17.647.937 16.707 0 15.549 0"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="grey"><path fill-rule="evenodd" d="M9.426 17.647H.974A.974.974 0 010 16.673V.974C0 .436.436 0 .974 0h15.7c.537 0 .973.436.973.974v15.699a.974.974 0 01-.974.974h-4.497v-6.834h2.294l.343-2.663h-2.637v-1.7c0-.772.214-1.297 1.32-1.297h1.41V2.77a18.853 18.853 0 00-2.055-.105c-2.033 0-3.425 1.241-3.425 3.52V8.15h-2.3v2.663h2.3v6.834z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="15" viewBox="0 0 21 15" fill="grey"><path fill-rule="evenodd" d="M8.109 9.73l-.001-5.679 5.522 2.85-5.521 2.83zm12.124-6.663s-.2-1.393-.812-2.006c-.778-.806-1.649-.81-2.048-.856C14.513 0 10.223 0 10.223 0h-.009s-4.29 0-7.15.205c-.4.046-1.27.05-2.048.856-.612.613-.812 2.006-.812 2.006S0 4.703 0 6.338v1.534c0 1.636.204 3.272.204 3.272s.2 1.392.812 2.006c.778.805 1.8.78 2.254.864 1.635.155 6.949.203 6.949.203s4.294-.006 7.154-.21c.4-.048 1.27-.052 2.048-.857.612-.614.812-2.006.812-2.006s.204-1.636.204-3.272V6.338c0-1.635-.204-3.271-.204-3.271z"></path></svg>
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="15" viewBox="0 0 18 15" fill="grey"><path fill-rule="evenodd" d="M17.647 1.74a7.072 7.072 0 01-2.079.585A3.704 3.704 0 0017.16.272a7.13 7.13 0 01-2.3.9A3.57 3.57 0 0012.217 0C10.22 0 8.598 1.662 8.598 3.712c0 .291.031.574.093.846-3.009-.155-5.676-1.632-7.463-3.88a3.78 3.78 0 00-.49 1.868c0 1.287.64 2.424 1.611 3.09a3.555 3.555 0 01-1.64-.463v.045c0 1.8 1.248 3.3 2.905 3.64-.304.088-.624.131-.954.131-.233 0-.461-.022-.682-.066.461 1.475 1.798 2.549 3.382 2.577A7.149 7.149 0 010 13.04a10.08 10.08 0 005.55 1.666c6.66 0 10.3-5.656 10.3-10.562 0-.162-.002-.323-.008-.482a7.43 7.43 0 001.805-1.921"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;