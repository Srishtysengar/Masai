import React from 'react';
import {useTheme} from '../context/ThemeContext';

function RepoCardBase({name, description, stars, forks, url, language}){
    const{theme}=useTheme();
    return(
        <article className="card" data-theme={theme}>
            <h3>
                <a href={url} target='_blank' rel='noreferrer'>{name}</a>
            </h3>
            <p style={{margin:0, minHeight:40}}>{description||'No description provided.'}</p>
            <div className='meta'>
                <span>*{stars}</span>
                <span>*{forks}</span>
                {language && <span>{language}</span>}
            </div>
        </article>
    );
}

export default React.memo(RepoCardBase);

