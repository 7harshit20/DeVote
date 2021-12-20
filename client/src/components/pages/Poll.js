import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import { Container } from 'semantic-ui-react'
import Navbar from '../layouts/Navbar'

const Poll = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenicated } = authContext;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenicated) navigate('/');
    }, [isAuthenicated, navigate])

    return (

        <Container style={{ margin: '5px' }}>
            <Navbar curr={'poll'} />

        </Container>
    )
}

export default Poll

