import React, { useState, useContext } from 'react';
import AuthContext from '../../context/auth/authContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css'
import { Link } from 'react-router-dom';


const Register = (props) => {

    const toggleForm = () => {
        const container = document.querySelector('.sl-cont .container');
        container.classList.toggle('active');
    };

    const authContext = useContext(AuthContext);


    const { register } = authContext
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const notifySuccess = (msg) => {
        toast.success(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }
    const notifyError = (msg) => {
        toast.error(msg, {
            position: toast.POSITION.TOP_RIGHT
        });
    }


    const { name, email, password, password2 } = user;

    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        if (name === '' || email === '' || password === '') {
            notifyError("please enter all fields");
        } else if (password !== password2) {
            notifyError("Passwords do not match");
        } else {
            register({
                name,
                email,
                password
            })
            console.log('registered')
            notifySuccess("User Registered successfully");
            // setAlert('User Registered successfully', 'success')
        }

    }

    return (
        <>

            <ToastContainer />
            <form onSubmit={onSubmit}>
                <h2>Create an account</h2>
                <input
                    type="text"
                    name="name"
                    value={name}
                    onChange={onChange}
                    placeholder="Full name"
                    required
                />
                <input
                    type="text"
                    name="email"
                    value={email}
                    onChange={onChange}
                    placeholder="Email"

                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"

                    required
                    minLength="6"
                />
                <input
                    type="password"
                    name="password2"
                    value={password2}
                    onChange={onChange}
                    placeholder="Confirm password"

                    required
                    minLength="6"

                />
                <input
                    type="submit"
                    value="Register"
                />
                <p className="signup" onClick={toggleForm}>
                    Already have an account ?
                                <Link to="/login" href="#">Sign in.</Link>
                </p>
            </form>

        </>
    )
}
export default Register
