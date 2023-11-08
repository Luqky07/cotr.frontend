import { useContext, createContext, useState, useEffect } from "react";
import { THEMES } from "../../../utils/Constants";

import './ThemeProvider.css'

const ThemeContext = createContext({
    theme: ''
});

export default function ThemeProvider({children}){
    const [theme, setTheme] = useState('')

    useEffect(() => {
        let savedTheme = getLocalStorageTheme()
        rechargeTheme(savedTheme);
    }, [])

    function handleChange(e){
        rechargeTheme(e.target.value)
    }

    function rechargeTheme(newTheme){
        setTheme(newTheme)
        const searchedTheme = THEMES.find(theme => theme.value === newTheme) ? THEMES.find(theme => theme.value === newTheme) : {name: 'Rosa', value: 'Pink', file : 'pink.css'};

        const themeLink = document.getElementById('theme-stylesheet');

        if (themeLink) {
            themeLink.href =  `../../../../themes/${searchedTheme.file}`;
        } else {
            const link = document.createElement('link');
            link.id = 'theme-stylesheet';
            link.rel = 'stylesheet';
            link.type = 'text/css';
            link.href = `../../../../themes/${searchedTheme.file}`;
            document.head.appendChild(link);
        }
        localStorage.setItem('theme', JSON.stringify(newTheme))
    }

    function getLocalStorageTheme(){
        const localTheme = localStorage.getItem("theme");
        if(localTheme) return JSON.parse(localTheme);
        return 'Pink'
    }

    return (
        <>
            <div className="select-container">
                <select name="theme" onChange={handleChange} value={theme}>
                    {THEMES.map((themeOption) => (
                            <option key={themeOption.value} value={themeOption.value}>
                                {themeOption.name}
                            </option>
                        ))
                    }
                </select>
            </div>
            
            <ThemeContext.Provider value={{theme}}>
                {children}
            </ThemeContext.Provider>
        </>
        
    )
}

export const useTheme = () => useContext(ThemeContext)