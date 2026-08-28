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

    const handleSignOut = () => {
        signOut();
        navigate("/", {replace: true});
    };

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
                            className="app-button app-button-secondary app-button-icon"
                            icon={<UserOutlined/>}
                            onClick={() => navigate("/user")}
                        />
                        <Button
                            aria-label="Event erstellen"
                            className="app-button app-button-primary app-button-icon"
                            icon={<PlusCircleOutlined/>}
                            onClick={() => navigate("/createEvent")}
                        />
                        <Button
                            aria-label="Abmelden"
                            className="app-button app-button-danger app-button-icon"
                            icon={<LogoutOutlined/>}
                            onClick={handleSignOut}
                        />
                    </> : <>
                        <Button className="app-button app-button-primary" onClick={() => navigate("/login")}>
                            Login
                        </Button>
                        <Button className="app-button app-button-secondary" onClick={() => navigate("/register")}>
                            Registrieren
                        </Button>
                    </>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
