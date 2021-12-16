import React from 'react'
import { Image, Grid, Container } from 'semantic-ui-react'
import image from '../../images/raise-hand.png'
import LoginForm from '../layouts/LoginForm'
import LoginHeader from '../layouts/LoginHeader'

const Home = () => {
    return (
        <Container style={{ margin: '5px' }}>
            <LoginHeader /><br /><br />
            <Grid columns={2} padded>
                <Grid.Column>
                    <LoginForm />
                </Grid.Column>
                <Grid.Column>
                    <Image src={image} />
                </Grid.Column>
            </Grid>

        </Container>
    )
}

export default Home
