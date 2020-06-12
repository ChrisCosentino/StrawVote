import React from 'react'
import { useState } from 'react'
import { Redirect } from 'react-router-dom';

const Search = () => {

    const [search, setSearch] = useState('');
    const [entered, setEntered] = useState(false);


    const handleOnChange = (e) => {
        setSearch(e.target.value);
    }


    const handleSubmit = () => {
        setEntered(true);
    }

    if(entered){
        return <Redirect to={search} />
    }

    return (
        <form className="search-form" onSubmit={handleSubmit}>
            <input placeholder="Search for poll code ..." type="text" value={search} id="search" onChange={handleOnChange} />
        </form>
    )
}

export default Search
