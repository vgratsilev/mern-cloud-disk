import { useDispatch, useSelector } from 'react-redux';
import Logo from 'assets/img/navbar-logo.svg';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'reducers/userReducer';

const Navbar = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    return (
        <div className={'navbar'}>
            <div className={'container'}>
                <NavLink
                    to={'/'}
                    className={'home-link'}
                >
                    <img
                        src={Logo}
                        alt={''}
                        className={'navbar__logo'}
                    />
                    <div className={'navbar__header'}>MERN Cloud</div>
                </NavLink>
                {!isAuth && (
                    <>
                        <div className={'navbar__login'}>
                            <NavLink to={'/login'}>Sign In</NavLink>
                        </div>

                        <div className={'navbar__registration'}>
                            <NavLink to={'/registration'}>Sign Up</NavLink>
                        </div>
                    </>
                )}
                {isAuth && (
                    <div
                        className={'navbar__logout'}
                        role={'menuitem'}
                        tabIndex={0}
                        onClick={() => dispatch(logoutUser())}
                    >
                        Sign Out
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
