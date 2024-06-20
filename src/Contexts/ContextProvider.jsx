import React, { createContext, useState } from 'react';

const ThemeContext = createContext({
    theme: 'light',
    toggleTheme: () => { },
});

const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');
    const [sidebar, setSidebar] = useState(false)
    const sidebarToggle = () => {
        setSidebar(!sidebar)
    }

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, sidebar, sidebarToggle }}>
            {children}
        </ThemeContext.Provider>
    );
};

export { ThemeContext, ThemeProvider };
