import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const LoginHeader = () => {
    return (
        <Menu style={{ fontSize: '20px' }} pointing secondary>
            <Link to="/">
                <a className='item active' >DeVote</a>
            </Link>
            <Link to="/about">
                <a className='item' >About Us</a>
            </Link>

            <Menu.Menu position='right'>
                <Menu.Item
                    name='Sign Up'
                />
            </Menu.Menu>
        </Menu>
    )
}

export default LoginHeader
