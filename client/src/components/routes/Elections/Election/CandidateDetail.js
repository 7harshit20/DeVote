import React, { useEffect, useContext } from 'react'
import ElectionContext from '../../../../context/election/ElectionContext'
import { useParams, Link, Outlet } from 'react-router-dom'
import { Table, Card, Container, Loader, Button } from 'semantic-ui-react'

const ElectionDetail = () => {
    const electionContext = useContext(ElectionContext)
    const { currElection, curr } = electionContext

    const params = useParams();
    useEffect(() => {
        currElection(params.address);
        // eslint-disable-next-line
    }, [])


    const setCurr = () => {
        if (!curr) return
        const items = curr[2].map((candidate, index) => (
            <Table.Row>
                <Table.Cell>{index}</Table.Cell>
                <Table.Cell>{candidate[0]}</Table.Cell>
                <Table.Cell>{candidate[1]}</Table.Cell>
                <Table.Cell>{candidate[2]}</Table.Cell>
                <Table.Cell>{candidate[3]}</Table.Cell>
            </Table.Row>
        ));
        return items.map(item => item);
    }

    return (
        <Container style={{ marginTop: '3%' }} >
            {!curr ? <Loader size='massive' active /> : (
                <div>
                    <Card.Group>
                        <Card fluid raised header={`Address of organiser: ${curr[0]}`} />
                        <Card fluid raised header={`Election title: ${curr[1]}`} />
                    </Card.Group>

                    <Table style={{ marginTop: '5%' }} color='blue' striped>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>ID</Table.HeaderCell>
                                <Table.HeaderCell>Public Address</Table.HeaderCell>
                                <Table.HeaderCell>Candidate's Name</Table.HeaderCell>
                                <Table.HeaderCell>Representing Party</Table.HeaderCell>
                                <Table.HeaderCell>Total Vote</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {setCurr()}
                        </Table.Body>
                    </Table>
                    <Link to={'vote'}>
                        <a><Button style={{ marginBottom: 10 }} primary>Vote</Button></a>
                    </Link>
                    <Link to={'nominate'}>
                        <a><Button floated='right' style={{ marginBottom: 10 }} primary>Nominate</Button></a>
                    </Link>
                </div>
            )}
            <Outlet />
        </Container>
    )
}

export default ElectionDetail
