import {useTheme} from '../context/ThemeContext';

const ThemeToggle=()=>{
    const{theme,toggleTheme} = useTheme;

    return(
        <button onClick={toggletheme}> 
        Switch to{theme==="light"?"Dark":"Light"} Mode
        </button>
    )
};

export default ThemeToggle;