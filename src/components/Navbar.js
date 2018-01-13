import React from 'react';

const Navbar = () => {
    return(
        <div className="navbar">
            <nav>
                <ul className="navbar__list">
                    <li className="navbar__item">Resume</li>
                    <li className="navbar__item">Portfolio</li>
                    <li className="navbar__item">Blog</li>
                    <li className="navbar__item">More</li>
                </ul>
            </nav>
        </div>
    );
}

export default Navbar;