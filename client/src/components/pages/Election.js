import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Button } from 'semantic-ui-react'
import Navbar from '../layouts/Navbar'

const Election = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenicated } = authContext;

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenicated) navigate('/');
    }, [isAuthenicated, navigate])

    return (
        <Container style={{ margin: '5px' }}>
            <Navbar curr={'election'} />
            <h3>Live Elections</h3>
            <Link to='/election/new'>
                <a><Button floated='right' content='Conduct elction' icon='add circle' primary labelPosition='right' /></a>
            </Link>
            {/* {getCampaign()} */}
        </Container>
    )
}

export default Election




