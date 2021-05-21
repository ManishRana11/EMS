import React, { useContext, useEffect } from 'react'
import DetailForm from '../details/DetailForm'
import AuthContext from '../../context/auth/authContext'
const Home = () => {
    const authContext = useContext(AuthContext)

    useEffect(() => {
        authContext.loadUser();
        //eslint-disable-next-line
    }, [])
    return (
        <div>
            <DetailForm />
        </div>
    )
}
export default Home
