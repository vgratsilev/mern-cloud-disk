import Navbar from 'components/navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './app.scss';
import Registration from './registration/Registration';

const App = () => (
    <BrowserRouter>
        <div className={'app'}>
            <Navbar />
            <div className={'wrap'}>
                <Routes>
                    <Route path={'/registration'} element={<Registration />} />
                </Routes>
            </div>
        </div>
    </BrowserRouter>
);

export default App;
