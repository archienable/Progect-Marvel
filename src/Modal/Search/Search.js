import React from 'react';
import './Search.css'

const Search = ({text, setText, placeholder, className}) => {

    return (
        <div className='containerSearch'>
            <form>
                <input
                    className={className}
                    value={text}
                    placeholder={placeholder}
                    type='search'
                    onChange={e => setText(e.target.value)} />
            </form>
        </div>
    );
};

export default Search;