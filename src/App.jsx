import React, {useSyncExternalStore} from 'react';
import AuthProvider from 'react-auth-kit/AuthProvider'
import createStore from 'react-auth-kit/createStore'
import RoutesComponent from './services/Routes';
import refreshApi from "./services/refreshApi";
import {ConfigProvider, theme} from "antd";

const store = createStore({
    authName: "_auth",
    authType: "cookie",
    cookieDomain: window.location.hostname,
    cookieSecure: window.location.protocol === "https:",
    refresh: refreshApi
});

const COLOR_SCHEME_QUERY = '(prefers-color-scheme: dark)';

function getPreferredColorScheme() {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return 'dark';
    }

    return window.matchMedia(COLOR_SCHEME_QUERY).matches ? 'dark' : 'light';
}

function subscribeToColorScheme(onChange) {
    if (typeof window === 'undefined' || !window.matchMedia) {
        return () => {};
    }

    const mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
    const handleChange = () => onChange();

    if (mediaQuery.addEventListener) {
        mediaQuery.addEventListener('change', handleChange);
    } else {
        mediaQuery.addListener(handleChange);
    }

    return () => {
        if (mediaQuery.removeEventListener) {
            mediaQuery.removeEventListener('change', handleChange);
        } else {
            mediaQuery.removeListener(handleChange);
        }
    };
}

const darkTheme = {
    algorithm: theme.darkAlgorithm,
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
            dangerShadow: 'none',
            defaultShadow: 'none',
            primaryColor: '#071008',
            fontWeight: 650,
            iconGap: 8,
            paddingInline: 16,
            solidTextColor: '#071008',
            defaultBorderColor: '#2b3d50',
            defaultBg: '#111b27',
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
};

const lightTheme = {
    algorithm: theme.defaultAlgorithm,
    hashed: false,
    token: {
        colorPrimary: '#43b91b',
        colorInfo: '#1769d1',
        colorSuccess: '#3da617',
        colorError: '#d9363e',
        colorBgBase: '#f3f6f4',
        colorBgContainer: '#ffffff',
        colorBgElevated: '#ffffff',
        colorBorder: '#c9d4d0',
        colorBorderSecondary: '#e1e9e5',
        colorText: '#1b2832',
        colorTextSecondary: '#586a73',
        colorTextTertiary: '#74858d',
        fontFamily: 'Inter, sans-serif',
        fontSize: 14,
        lineHeight: 1.5,
        borderRadius: 9,
        borderRadiusLG: 14,
        controlHeight: 44,
    },
    components: {
        Button: {
            dangerShadow: 'none',
            defaultShadow: 'none',
            primaryColor: '#071008',
            fontWeight: 650,
            iconGap: 8,
            paddingInline: 16,
            solidTextColor: '#071008',
            defaultBorderColor: '#c9d4d0',
            defaultBg: '#ffffff',
            defaultColor: '#1b2832',
            defaultHoverBg: '#f7faf8',
            defaultHoverBorderColor: '#8ea59a',
            defaultHoverColor: '#1b2832',
            primaryShadow: 'none',
        },
        Card: {
            actionsBg: '#f5f8f6',
            headerBg: '#ffffff',
            bodyPadding: 24,
            bodyPaddingSM: 16,
        },
        Input: {
            activeBg: '#ffffff',
            hoverBg: '#ffffff',
            activeBorderColor: '#1769d1',
            hoverBorderColor: '#8ea59a',
        },
        Table: {
            headerBg: '#f5f8f6',
            headerColor: '#586a73',
            borderColor: '#e1e9e5',
            rowHoverBg: '#f1f8f3',
            footerBg: '#ffffff',
            footerColor: '#586a73',
        },
    },
};

function App() {
    const colorScheme = useSyncExternalStore(
        subscribeToColorScheme,
        getPreferredColorScheme,
        () => 'dark'
    );
    const themeConfig = colorScheme === 'dark' ? darkTheme : lightTheme;

    return (
        <ConfigProvider theme={themeConfig}>
            <AuthProvider store={store}>
                <RoutesComponent/>
            </AuthProvider>
        </ConfigProvider>
    );
}

export default App;
