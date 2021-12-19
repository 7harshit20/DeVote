import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Button } from 'semantic-ui-react'

const Election = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenicated, logout } = authContext;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenicated) navigate('/');
    }, [isAuthenicated, navigate])

    return (
        <div>
            <Button onClick={logout}>Logout</Button>
        </div>
    )
}

export default Election
