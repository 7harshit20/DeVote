import React from 'react'
import { Input, Header, Image, Grid, Container } from 'semantic-ui-react'
import LoginHeader from '../layouts/LoginHeader'


const Home = () => {
    return (
        <Container style={{ margin: '10px' }}>
            <LoginHeader /><br /><br />
            <Grid columns={2} padded>
                <Grid.Column>
                    <Header
                        style={{ fontSize: '45px' }}
                        as='h1'
                        content='Secured and Reliable election on the go. '
                    /> <br />
                    <Input placeholder='Email' focus style={{ width: '100%' }} /> <br /><br />
                    <Input type='password' placeholder='Password' focus style={{ width: '100%' }} />
                </Grid.Column>
                <Grid.Column>
                    <Image src='https://react.semantic-ui.com/images/wireframe/paragraph.png' />
                </Grid.Column>
            </Grid>

        </Container>
    )
}

export default Home
