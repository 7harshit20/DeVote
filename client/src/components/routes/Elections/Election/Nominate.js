import React, { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Button, Form, Input, Message } from 'semantic-ui-react'
import ElectionContext from '../../../../context/election/ElectionContext'

const Nominate = () => {
    const electionContext = useContext(ElectionContext)
    const { nominateCurr, error, loading } = electionContext

    const { address } = useParams();

    const [form, setForm] = useState({
        name: null,
        party: null
    });
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        nominateCurr(address, form.name, form.party);
    }

    return (
        <Container>
            <h3>Nominate yourself for election</h3>
            <Form error={error} onSubmit={onSubmit}>
                <Form.Field>
                    <label>Name</label>
                    <Input required name='name' onChange={onChange} />
                </Form.Field>
                <Form.Field>
                    <label>Representing party</label>
                    <Input required name='party' onChange={onChange} />
                </Form.Field>
                <Message error header='Error' content={error ? error.message : ''} />
                <Button type='submit' primary loading={loading}>Submit Details</Button>
            </Form><br />
            <Link to='../'>
                <a>← Back to election</a>
            </Link>
        </Container>
    )
}

export default Nominate
