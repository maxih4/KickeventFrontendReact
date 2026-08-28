import React from 'react';
import {Divider} from "antd";
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-8 pb-4">
            <Divider className="bg-primary-100 w-full opacity-50 mt-8 mb-1"/>
            <nav className="container flex flex-wrap flex-row justify-center gap-x-8 gap-y-2 font-body" aria-label="Fußzeile">
                <Link
                    to="/impressum"
                    className="inline-flex min-h-11 items-center rounded px-2 text-text no-underline hover:text-primary-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-300"
                >
                    Impressum
                </Link>
                <span className="inline-flex min-h-11 items-center px-2 text-text">Kontaktformular</span>
            </nav>
        </footer>
    );
};

export default Footer;
