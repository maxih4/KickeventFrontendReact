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
        <header className="border-b border-slate-200 bg-white dark:border-background-800 dark:bg-background-900">
            <nav
                className="mx-auto flex min-h-16 w-[calc(100%-1.5rem)] max-w-[1232px] items-center justify-between gap-3 sm:min-h-[72px] sm:w-[calc(100%-2rem)] sm:gap-6"
                aria-label="Hauptnavigation"
            >
                <Link to="/" className="inline-flex min-h-11 items-center gap-2 no-underline sm:gap-3">
                    <span className="inline-flex h-8 w-8 shrink-0 overflow-hidden rounded-[10px] sm:h-[35px] sm:w-[35px]" aria-hidden="true">
                        <img className="block h-full w-full" src="/kickevent-mark.svg" alt="" />
                    </span>
                    <span className="font-heading text-xl font-[650] tracking-[-0.02em] text-text-900 dark:text-text sm:text-[23px]">KickEvent</span>
                </Link>

                <div className="flex items-center gap-1.5 sm:gap-2.5">
                    {isAuthenticated ? <>
                        <Button
                            aria-label="Zum Userpanel"
                            className="!h-10 !min-w-10 !rounded-[10px] !border-secondary-500 !bg-secondary-500 !px-0 !text-white hover:!border-secondary-400 hover:!bg-secondary-400"
                            icon={<UserOutlined/>}
                            onClick={() => navigate("/user")}
                        />
                        <Button
                            aria-label="Event erstellen"
                            className="!h-10 !min-w-10 !rounded-[10px] !border-primary-400 !bg-primary-400 !px-0 !text-[#071008] hover:!border-primary-300 hover:!bg-primary-300"
                            icon={<PlusCircleOutlined/>}
                            onClick={() => navigate("/createEvent")}
                        />
                        <Button
                            aria-label="Abmelden"
                            className="!h-10 !min-w-10 !rounded-[10px] !border-red-500 !bg-red-500 !px-0 !text-white hover:!border-red-400 hover:!bg-red-400"
                            icon={<LogoutOutlined/>}
                            onClick={handleSignOut}
                        />
                    </> : <>
                        <Button
                            className="!h-10 !rounded-[10px] !border-primary-400 !bg-primary-400 !px-[17px] !font-semibold !text-[#071008] hover:!border-primary-300 hover:!bg-primary-300 max-sm:!px-[11px]"
                            onClick={() => navigate("/login")}
                        >
                            Login
                        </Button>
                        <Button
                            className="!h-10 !rounded-[10px] !border-secondary-500 !bg-secondary-500 !px-[17px] !font-semibold !text-white hover:!border-secondary-400 hover:!bg-secondary-400 max-sm:!px-[11px]"
                            onClick={() => navigate("/register")}
                        >
                            Registrieren
                        </Button>
                    </>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
