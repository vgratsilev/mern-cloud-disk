import { login } from 'actions/user';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import Input from 'utils/input/Input';
import './authorization.scss';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    return (
        <div className={'authorization'}>
            <div className={'authorization__header'}>Login</div>
            <Input
                value={email}
                setValue={setEmail}
                placeholder={'Enter email...'}
            />
            <Input
                value={password}
                setValue={setPassword}
                type={'password'}
                placeholder={'Enter password...'}
            />
            <button
                type={'button'}
                className={'authorization__btn'}
                onClick={() => dispatch(login(email, password))}
            >
                Login
            </button>
        </div>
    );
};

export default Login;
