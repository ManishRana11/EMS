import React, { useState, useContext } from 'react'
import AuthContext from '../../context/auth/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './styles.css'
import { Link } from 'react-router-dom';

const Login = (props) => {

    const authContext = useContext(AuthContext);

    const { login } = authContext

    const [user, setUser] = useState({
        email: '',
        password: '',
    });


    const toggleForm = () => {
        const container = document.querySelector('.sl-cont .container');
        container.classList.toggle('active');
    };

    const notifyError = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }

    const { email, password } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (email === '' || password === '') {
            notifyError("please enter all fields");
        } else {
            login({
                email,
                password
            })
        }
    }

    return (

        <>
            <ToastContainer />
            <form onSubmit={onSubmit}>
                <h2>Sign In</h2>
                <input type="text" name="email" value={email} onChange={onChange} placeholder="Your Email" required />
                <input type="password" name="password" value={password} onChange={onChange} placeholder="Your Password" required />
                <input type="submit" value='Login' />
                <p className="signup" onClick={toggleForm}>
                    Don't have an account ?
                    <Link to="/register" href="#">Sign Up.</Link>
                </p>
            </form>
        </>
    )
}
export default Login
