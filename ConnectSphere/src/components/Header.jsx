import {Link, NavLink} from 'react-router-dom';

export default function Header(){
    const linkStyle =({isActive})=>({
        textDecoration: 'none',
        fontWeight: isActive ?'700':'500',
    });

    return(
        <header style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '12px 16px',
            borderBottam:'1px solid black',
        }}>
          <Link to="/" style={{textDecoration: 'none', color:'inherit'}}>
          <h1 style={{margin:0, fontSize:20}}>Connect Sphere</h1>
          </Link>
          <nav style={{display: 'flex',gap:16}}>
            <NavLink to="/" style={{linkStyle}}>Home</NavLink>
            <NavLink to="/following" style={{linkStyle}}>Following</NavLink>
          </nav>
        </header>
    )
}