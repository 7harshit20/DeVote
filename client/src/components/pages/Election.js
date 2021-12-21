import React, { useContext, useEffect } from 'react'
import AuthContext from '../../context/auth/AuthContext'
import ElectionContext from '../../context/election/ElectionContext'
import { Link, useNavigate } from 'react-router-dom'
import { Container, Button, Card } from 'semantic-ui-react'
import Navbar from '../layouts/Navbar'

const Election = () => {
    const authContext = useContext(AuthContext)
    const { isAuthenicated } = authContext;

    const electionContext = useContext(ElectionContext)
    const { elections, getElections } = electionContext

    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenicated) navigate('/');
        getElections();
        // eslint-disable-next-line
    }, [isAuthenicated, navigate])

    const displayElection = () => {
        if (!elections) return null;
        const items = elections.map((address) => {
            return {
                header: address,
                description:
                    <Link to={`/election`}>
                        <a> View Campaign </a>
                    </Link>,
                fluid: true,
                style: { overflowWrap: 'break-word' }
            };
        });
        return <Card.Group items={items} />
    }

    return (
        <Container style={{ margin: '5px' }}>
            <Navbar curr={'election'} />
            <h3>Live Elections</h3>
            <Link to='/election/new'>
                <a><Button floated='right' content='Conduct election' icon='add circle' primary labelPosition='right' /></a>
            </Link>
            {displayElection()}
        </Container>
    )
}

export default Election




