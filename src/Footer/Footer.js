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
                <div className={style.block}>
                    <div>
                        FOLLOW MARVEL
                        <div>inst</div>
                        <div>face</div>
                        <div>youtube</div>
                        <div>twiter</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;