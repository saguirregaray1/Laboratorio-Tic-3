import React from "react";
import "../header/styles.css"

const Header: React.FC = () => {
    return(
        <header>
            <nav>
                <ul>
                    <li><a>Play</a></li>
                    <li><a>Who we are</a></li>
                    <li><a>Log In</a></li>
                    <li><a>Sign Up</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;