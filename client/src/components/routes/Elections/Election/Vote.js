import { sha256 } from 'js-sha256'
import React, { useState, useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Container, Button, Form, Input, Message } from 'semantic-ui-react'
import ElectionContext from '../../../../context/election/ElectionContext'

const Vote = () => {
    const electionContext = useContext(ElectionContext)
    const { voteCurr, error, loading } = electionContext

    const { address } = useParams();

    const [form, setForm] = useState({
        uniqueId: null,
        index: null
    });
    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault();
        voteCurr(address, sha256(form.uniqueId), parseInt(form.index));
    }

    return (
        <Container>
            <h3>Create a request</h3>
            <Form error={error} onSubmit={onSubmit}>
                <Form.Field>
                    <label>Your Unique Identification number</label>
                    <Input required name='uniqueId' onChange={onChange} />
                </Form.Field>
                <Form.Field>
                    <label>Index of preferred candidate </label>
                    <Input required name='index' onChange={onChange} />
                </Form.Field>
                <Message error header='Error' content={error ? error.message : ''} />
                <Button type='submit' primary loading={loading}>Cast Vote</Button>
            </Form><br />
            <Link to='../'>
                <a>← Back to election</a>
            </Link>
        </Container>
    )
}

export default Vote
