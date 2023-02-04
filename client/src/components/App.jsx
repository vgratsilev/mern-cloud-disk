import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Navbar from 'components/navbar/Navbar';
import Login from 'components/authorization/Login';
import Registration from 'components/authorization/Registration';
import Home from 'components/home/Home';

import './app.scss';

import { auth } from 'actions/user';
import Disk from './disk/Disk';

const App = () => {
    const isAuth = useSelector((state) => state.user.isAuth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(auth());
    }, [dispatch]);

    return (
        <BrowserRouter>
            <div className={'app'}>
                <Navbar />
                <div className={'wrap'}>
                    <Routes>
                        {!isAuth && (
                            <>
                                <Route
                                    path={'/registration'}
                                    element={<Registration />}
                                />
                                <Route
                                    path={'/login'}
                                    element={<Login />}
                                />
                                <Route
                                    path={'*'}
                                    element={
                                        <Navigate
                                            to={'/login'}
                                            replace
                                        />
                                    }
                                />
                            </>
                        )}
                        {isAuth && (
                            <>
                                <Route
                                    exact
                                    path={'/'}
                                    element={<Disk />}
                                />
                                <Route
                                    path={'*'}
                                    element={
                                        <Navigate
                                            to={'/'}
                                            replace
                                        />
                                    }
                                />
                            </>
                        )}
                    </Routes>
                </div>
            </div>
        </BrowserRouter>
    );
};

export default App;
