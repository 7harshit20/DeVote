import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Button, Form, Grid, Header, Image, Message, Segment } from 'semantic-ui-react'
import image from '../../images/devote.png'
import AuthContext from '../../context/auth/AuthContext'

const SignUp = props => {

    const authContext = useContext(AuthContext);
    const { isAuthenicated, error, register, loading } = authContext
    const navigate = useNavigate();
    const [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [formLoad, setFormLoad] = useState(loading)
    const [err, setErr] = useState({
        type: null,
        msg: null
    })

    const onChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const onSubmit = e => {
        e.preventDefault();
        setFormLoad(true);
        register(form);
    }

    useEffect(() => {
        if (isAuthenicated) navigate('/election');
        setErr({ msg: error });
        setFormLoad(loading);
    }, [isAuthenicated, error, loading, navigate])

    return (
        <Fragment>

            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 500 }}>

                    <Header as='h1' color='black' textAlign='center'>
                        <Image src={image} /> <br /> <br />
                        Sign up to <span style={{ color: 'red' }}>conduct</span>, <span style={{ color: 'blue' }}>contest</span> and <span style={{ color: 'green' }}>vote</span>
                    </Header>

                    {err.msg !== null ? <Message warning header={err.msg} /> : null}
                    <Form loading={formLoad} onSubmit={onSubmit} size='large'>
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
