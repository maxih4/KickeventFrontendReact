import React from 'react';
import { useNavigate} from "react-router-dom";
import imgurl from "../img/Fußballimage.webp"
import {Button} from "antd";

const HomeHeader = () => {
const navigate = useNavigate()

    return (
        <section
            className="grid min-h-[254px] grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] overflow-hidden rounded-[14px] border border-slate-200 bg-white shadow-lg dark:border-background-600 dark:bg-background-800 max-[900px]:grid-cols-[minmax(0,1.2fr)_minmax(0,.8fr)] max-[640px]:flex max-[640px]:flex-col"
            aria-labelledby="home-hero-title"
        >
            <div className="flex min-w-0 flex-col items-start justify-center p-9 px-10 max-[900px]:px-7 max-[640px]:px-[22px] max-[640px]:pb-6 max-[640px]:pt-7">
                <h1
                    id="home-hero-title"
                    className="m-0 max-w-[620px] font-heading text-[clamp(2.25rem,3.3vw,2.8rem)] font-[650] leading-[1.06] tracking-[-0.045em] text-slate-900 [text-wrap:balance] dark:text-text max-[900px]:text-[clamp(2rem,4.4vw,2.5rem)] max-[640px]:text-[2.1rem]"
                >
                    Erstelle dein <span className="text-primary-700 dark:text-primary-400">Event</span> zum <span className="text-primary-700 dark:text-primary-400">Kicken</span> &amp; finde heute noch passende Mitspieler
                </h1>
                <Button
                    className="!mt-7 !h-11 !rounded-[9px] !border-slate-300 !bg-transparent !px-4 !font-[650] !text-slate-900 hover:!border-primary-600 hover:!text-primary-700 dark:!border-background-600 dark:!text-text dark:hover:!border-primary-400 dark:hover:!text-primary-400"
                    onClick={() => navigate("/createEvent")}
                >
                    Event erstellen!
                </Button>
            </div>
            <img
                className="h-full min-h-[254px] w-full border-s border-slate-200 object-cover object-center outline outline-1 outline-black/10 outline-offset-[-1px] dark:border-background-600 dark:outline-white/10 max-[640px]:h-[180px] max-[640px]:min-h-0 max-[640px]:border-s max-[640px]:border-t max-[640px]:border-s-0"
                src={imgurl}
                alt="Fußballspieler beim Kicken"
            />
        </section>
    );
};

export default HomeHeader;
