import { createContext, useState, useContext} from 'react';

const ThemeContext = createContext();

export const ThemeProvider =({children})=>{
    const[theme,setTheme]=useState("light");

    const toggleTheme=()=>
        setTheme((prev)=>(prev==="light"?"dark":"light"));

    return(
        <ThemeContext.provider value={{theme,toggleTheme}}>
            <div className={`app ${theme}`}>{children}</div>
        </ThemeContext.provider> 
    )
}

export const useTheme=()=>useContext(ThemeContext);