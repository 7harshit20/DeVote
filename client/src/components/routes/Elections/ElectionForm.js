import React, { useContext, useState } from 'react'
import { Button, Container, Form, Input, Message } from 'semantic-ui-react'
import ElectionContext from '../../../context/election/ElectionContext'
import { sha256 } from 'js-sha256'
// import { useNavigate } from 'react-router-dom'

const ElectionForm = () => {
    const electionContext = useContext(ElectionContext);
    const { createElection, error, loading } = electionContext;

    const [form, setForm] = useState({
        title: '',
        list: ''
    })


    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        const voterList = form.list.split(",").map(id => sha256(id));
        createElection(voterList, form.title);
    }

    return (
        <Container style={{ margin: '5px' }}>
            <h3>Create new election</h3>
            <Form onSubmit={onSubmit} error={!!error}>
                <Form.Field>
                    <label>Election title</label>
                    <Input placeholder='A suitable title for your election' name='title' onChange={onChange} value={form.title} required={true} />
                </Form.Field>
                <Form.Field>
                    <label>List of Unique indentification of voters</label>
                    <Input placeholder='The list should have unique address separated by commas and no spaces' name='list' onChange={onChange} value={form.list} required={true} />
                </Form.Field>
                <Message error header='Error' content={error ? error.message : ''} />
                <Button primary type='submit' loading={loading} >Create!</Button>
            </Form>
        </Container>
    )
}

export default ElectionForm
