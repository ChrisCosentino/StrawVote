import React from 'react'
import { Link } from 'react-router-dom'

import { GrSearch } from 'react-icons/gr';

const Navbar = () => {

    return (
        <nav>
            <Link to="/" className="home-link"><h1>Poll</h1></Link>
            <div>
                <Link className="nav-link" id="create-btn" to="/create">Create</Link>
                <Link className="nav-link" id="search-btn" to="/search"><GrSearch /></Link>
            </div>
        </nav>
    )
}

export default Navbar;
