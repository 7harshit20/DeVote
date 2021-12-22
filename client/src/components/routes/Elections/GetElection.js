import React, { useContext, useEffect } from 'react'
import ElectionContext from '../../../context/election/ElectionContext'
import { Container, Button, Card, Loader } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const GetElection = () => {

    const electionContext = useContext(ElectionContext)
    const { elections, getElections } = electionContext


    useEffect(() => {
        getElections();
        // eslint-disable-next-line
    }, [])

    const displayElection = () => {
        if (!elections) return null;
        const items = elections.map((address) => {
            return {
                header: address,
                description:
                    <Link to={`${address}`}>
                        <a> View Election </a>
                    </Link>,
                fluid: true,
                style: { overflowWrap: 'break-word' }
            };
        });
        return <Card.Group items={items} />
    }

    return (
        <Container>
            {elections ? (
                <div>
                    <h3>Live Elections</h3>
                    <Link to='new'>
                        <a><Button floated='right' content='Conduct election' icon='add circle' primary labelPosition='right' /></a>
                    </Link>
                    {displayElection()}
                </div>
            ) : <Loader size='massive' active />}
        </Container>

    )
}

export default GetElection




