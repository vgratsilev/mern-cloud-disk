import { useDispatch, useSelector } from 'react-redux';
import Logo from 'assets/img/navbar-logo.svg';
import './navbar.scss';
import { NavLink } from 'react-router-dom';
import { logoutUser } from 'reducers/userReducer';
import { useEffect, useState } from 'react';
import { getFiles, searchFiles } from 'actions/file';
import useDebounce from 'utils/useDebounce';

const isAuthSelector = (state) => state.user.isAuth;
const currentDirSelector = (state) => state.files.currentDir;

const Navbar = () => {
    const isAuth = useSelector(isAuthSelector);
    const currentDir = useSelector(currentDirSelector);
    const dispatch = useDispatch();

    const [searchName, setSearchName] = useState('');
    const debouncedSearchName = useDebounce(searchName, 500);

    const searchNameChangeHandler = (e) => {
        const value = e.target.value?.trim();
        setSearchName(value);
    };

    useEffect(() => {
        if (debouncedSearchName !== '') {
            dispatch(searchFiles(debouncedSearchName));
        } else {
            dispatch(getFiles(currentDir));
        }
    }, [dispatch, debouncedSearchName, currentDir]);

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
                {isAuth && (
                    <input
                        type={'text'}
                        className={'navbar__search'}
                        placeholder={'file name...'}
                        value={searchName}
                        onChange={searchNameChangeHandler}
                    />
                )}
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
