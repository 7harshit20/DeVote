import React, { useContext, useEffect } from 'react'
import AuthContext from '../../../context/auth/AuthContext'
import { Outlet, useNavigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Navbar from '../../layouts/Navbar'

const Election = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenicated } = authContext;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenicated) navigate('/');
        // eslint-disable-next-line
    }, [isAuthenicated, navigate])

    return (
        <Container style={{ margin: '5px' }}>
            <Navbar curr={'election'} />
            <Outlet />
        </Container>
    )
}

export default Election




