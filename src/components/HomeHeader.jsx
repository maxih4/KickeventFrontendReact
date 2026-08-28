import React from 'react';
import { useNavigate} from "react-router-dom";
import imgurl from "../img/Fußballimage.webp"
import {Button} from "antd";

const HomeHeader = () => {
const navigate = useNavigate()

    return (
        <section className="home-hero surface-card" aria-labelledby="home-hero-title">
            <div className="home-hero-copy">
                <h1 id="home-hero-title">
                    Erstelle dein <span className="accent-text">Event</span> zum <span className="accent-text">Kicken</span> &amp; finde heute noch passende Mitspieler
                </h1>
                <Button className="hero-cta" onClick={() => navigate("/createEvent")}>
                    Event erstellen!
                </Button>
            </div>
            <img className="home-hero-media" src={imgurl} alt="Fußballspieler beim Kicken"/>
        </section>
    );
};

export default HomeHeader;
