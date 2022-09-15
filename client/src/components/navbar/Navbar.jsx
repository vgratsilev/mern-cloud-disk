import Logo from 'assets/img/navbar-logo.svg';
import './navbar.scss';
import { NavLink } from 'react-router-dom';

const Navbar = () => (
    <div className={'navbar'}>
        <div className={'container'}>
            <img src={Logo} alt={''} className={'navbar__logo'} />
            <div className={'navbar__header'}>MERN Cloud</div>
            <div className={'navbar__login'}>
                <NavLink to={'/login'}>Sign In</NavLink>
            </div>
            <div className={'navbar__registration'}>
                <NavLink to={'/registration'}>Sign Up</NavLink>
            </div>
        </div>
    </div>
);

export default Navbar;
