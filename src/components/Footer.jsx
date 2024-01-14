import React from 'react';
import {Divider} from "antd";

const Footer = () => {
    return (
        <>
            <Divider className="bg-primary-100 w-full opacity-50 mt-8 mb-1" orientationMargin=""/>
            <div className="container flex flex-row justify-evenly">

                <h4 className="font-body text-text">
                    Impressum
                </h4>
                <h4 className="font-body text-text">
                    Kontakt
                </h4>
            </div>
        </>
    );
};

export default Footer;