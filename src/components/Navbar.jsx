import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import {Button} from "antd";
import {LogoutOutlined, PlusCircleOutlined, UserOutlined} from "@ant-design/icons";

function Navbar() {
    const isAuthenticated = useIsAuthenticated();
    const signOut = useSignOut();
    const navigate = useNavigate();

    return (
        <header className="site-header">
            <nav className="page-container site-nav" aria-label="Hauptnavigation">
                <Link to="/" className="brand">
                    <span className="brand-mark" aria-hidden="true">
                        <img src="/kickevent-mark.svg" alt="" />
                    </span>
                    <span className="brand-name">KickEvent</span>
                </Link>

                <div className="site-nav-actions">
                    {isAuthenticated ? <>
                        <Button
                            aria-label="Zum Userpanel"
                            className="nav-icon-button nav-profile-button"
                            icon={<UserOutlined/>}
                            onClick={() => navigate("/user")}
                        />
                        <Button
                            aria-label="Event erstellen"
                            className="nav-icon-button nav-create-button"
                            icon={<PlusCircleOutlined/>}
                            onClick={() => navigate("/createEvent")}
                        />
                        <Button
                            aria-label="Abmelden"
                            className="nav-icon-button nav-logout-button"
                            icon={<LogoutOutlined/>}
                            onClick={() => signOut()}
                        />
                    </> : <>
                        <Button className="nav-primary-button" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button className="nav-secondary-button" onClick={() => navigate("/register")}>
                            Registrieren
                        </Button>
                    </>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
