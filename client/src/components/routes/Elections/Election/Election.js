import React from 'react'
import { Outlet, Link } from 'react-router-dom'

const Election = () => {
    return (
        <div>
            <Outlet />
            {/* <Link to='../'>
                <a>← Back to elections </a>
            </Link> */}
        </div>
    )
}

export default Election
