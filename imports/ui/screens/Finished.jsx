import React from 'react'
import { Link } from 'react-router-dom'

const Finished = () => (
    <div className="Finished">
        <p>Your order is complete, thank you for buying with us!</p>
        <Link to="/">Return</Link>
    </div>
)

export default Finished