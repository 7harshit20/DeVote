import React, { Fragment, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import image from '../../images/devote.png'

const SignUp = () => {
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: ''
    })

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
    }

    return (
        <Fragment>

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>

                    <Header as='h1' color='black' textAlign='center'>
                        <Image src={image} /> <br /> <br />
                        Sign up to <span style={{ color: 'red' }}>conduct</span>, <span style={{ color: 'blue' }}>contest</span> and <span style={{ color: 'green' }}>vote</span>

                    </Header>
                    <Form onSubmit={onSubmit} size='large'>
                        <Segment padded stacked>

                            <Form.Input name='name' onChange={onChange} required={true} size='big' fluid icon='user' iconPosition='left' placeholder='Name'
                            />

                            <Form.Input name='email' onChange={onChange} required={true} type='email' size='big' fluid icon='mail' iconPosition='left' placeholder='E-mail address' />

                            <Form.Input
                                name='password'
                                onChange={onChange}
                                required={true}
                                fluid
                                size='big'
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                            />

                            <Button type='submit' color='green' fluid size='large'>
                                Sign Up
                            </Button>

                        </Segment>
                    </Form>

                    <Message >
                        Already have an account? <Link to='/'>Login</Link>
                    </Message>

                </Grid.Column>
            </Grid>

        </Fragment>
    )
}

export default SignUp
