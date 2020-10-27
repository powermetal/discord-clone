import React from 'react';
import Button from '@material-ui/core/Button'
import './Login.css';
import { auth, provider } from './firebase';

import { login } from './userSlice';

const Login = () => {
    const onSignIn = () => {
        auth.signInWithPopup(provider).catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__logo">
                 <img src="https://discord.com/assets/fc0b01fe10a0b8c602fb0106d8189d9b.png" />
            </div>
            <Button onClick={onSignIn}>Sign in</Button>
        </div>
    )
}

export default Login;
