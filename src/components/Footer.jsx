import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="site-footer">
            <nav className="page-container site-footer-nav" aria-label="Fußzeile">
                <Link
                    to="/impressum"
                    className="site-footer-link"
                >
                    Impressum
                </Link>
                <span className="site-footer-text">Kontaktformular</span>
            </nav>
        </footer>
    );
};

export default Footer;
