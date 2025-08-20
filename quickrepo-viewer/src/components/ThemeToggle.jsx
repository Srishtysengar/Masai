import {useTheme} from '../context/ThemeContext';

export default function ThemeToggle(){
    const{theme, toggleTheme}=useTheme();

    return(
        <button className='button' onClick={toggleTheme} aria-label='Toggle color theme'>
            {theme === 'light' ? 'light' : 'dark'}
        </button>
    )
}