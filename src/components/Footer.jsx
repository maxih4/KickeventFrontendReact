import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <footer className="mt-auto border-t border-slate-200 bg-white/90 py-2 dark:border-background-800 dark:bg-background-950/90">
            <nav
                className="mx-auto flex w-[calc(100%-1.5rem)] max-w-[1232px] flex-wrap justify-center gap-x-6 gap-y-3 sm:w-[calc(100%-2rem)]"
                aria-label="Fußzeile"
            >
                <Link
                    to="/impressum"
                    className="inline-flex min-h-[38px] items-center text-sm text-slate-500 no-underline hover:text-slate-900 dark:text-text-400 dark:hover:text-text"
                >
                    Impressum
                </Link>
                <span className="inline-flex min-h-[38px] items-center text-sm text-slate-500 dark:text-text-400">Kontaktformular</span>
            </nav>
        </footer>
    );
};

export default Footer;
