import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

const LoginHeader = () => {
    return (
        <Menu style={{ fontSize: '20px' }} pointing secondary>
            <Link to="/">
                <span className='item active'>DeVote</span>
            </Link>
            <Link to="/about">
                <span className='item' >About Us</span>
            </Link>

            <Menu.Menu position='right'>
                <Link to="/signup">
                    <span className='item' >Sign Up</span>
                </Link>
            </Menu.Menu>
        </Menu>
    )
}

export default LoginHeader
