import React from 'react';
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import "./css/App.scss"
import {ConfigProvider, theme} from "antd";

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    refresh: refreshApi
});

function App() {
    const {darkAlgorithm} = theme;
    return (
        <ConfigProvider theme={{
            algorithm: darkAlgorithm,
            hashed: false,
            token: {
                colorPrimary: '#4dcc1b',
                colorInfo: '#1f7af2',
                colorSuccess: '#4dcc1b',
                colorError: '#ff4d56',
                colorBgBase: '#080d12',
                colorBgContainer: '#111b27',
                colorBgElevated: '#14212e',
                colorBorder: '#2b3d50',
                colorBorderSecondary: '#1e2c3a',
                colorText: '#f1f4f7',
                colorTextSecondary: '#9eacbb',
                colorTextTertiary: '#728294',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                lineHeight: 1.5,
                borderRadius: 9,
                borderRadiusLG: 14,
                controlHeight: 44,
            },
            components: {
                Button: {
                    primaryColor: '#071008',
                    solidTextColor: '#071008',
                    defaultBg: '#111b27',
                    defaultBorderColor: '#2b3d50',
                    defaultColor: '#f1f4f7',
                    defaultHoverBg: '#14212e',
                    defaultHoverBorderColor: '#3d5870',
                    defaultHoverColor: '#f1f4f7',
                    primaryShadow: 'none',
                },
                Card: {
                    actionsBg: '#0a1118',
                    headerBg: '#111b27',
                    bodyPadding: 24,
                    bodyPaddingSM: 16,
                },
                Input: {
                    activeBg: '#0a1118',
                    hoverBg: '#0a1118',
                    activeBorderColor: '#4b98ff',
                    hoverBorderColor: '#3d5870',
                },
                Table: {
                    headerBg: '#0a1118',
                    headerColor: '#9eacbb',
                    borderColor: '#1e2c3a',
                    rowHoverBg: '#14212e',
                    footerBg: '#111b27',
                    footerColor: '#9eacbb',
                },
            },
        }}>
            <AuthProvider store={store}>
                <RoutesComponent/>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
