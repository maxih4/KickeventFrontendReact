import React from 'react';

const Footer = () => {
    return (
        <div className="container-fluid bg-light d-flex flex-row justify-content-evenly mt-5">
        <span className="p-3" style={{fontFamily:"Outfit", fontSize:"20px", fontWeight:"bold"}}>
            Impressum
        </span>
            <span className="p-3" style={{fontFamily:"Outfit", fontSize:"20px", fontWeight:"bold"}}>
                Kontakt
            </span>
        </div>
    );
};

export default Footer;