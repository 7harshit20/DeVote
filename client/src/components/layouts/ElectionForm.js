import React from 'react'
import { Button, Container, Form, Input, Message } from 'semantic-ui-react'
import Navbar from './Navbar'

const ElectionForm = () => {
    return (
        <Container style={{ margin: '5px' }}>
            <Navbar />
            <h3>Create new election</h3>
            <Form>
                <Form.Field>
                    <label>Election title</label>
                    <Input placeholder='A suitable title for your election' />
                </Form.Field>
                <Form.Field>
                    <label>List of Unique indentification of voters</label>
                    <Input placeholder='The list should have unique address separated by commas and no spaces' />
                </Form.Field>
                {/* <Message error header='Error' content={errorMsg} /> */}
                <Button primary type='submit'>Create!</Button>
            </Form>
        </Container>
    )
}

export default ElectionForm
