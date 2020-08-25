import React, { useState } from 'react'

const Login = () => {
    const [user, setUser] = useState("")
    const [password, setPassword] = useState("")
    const [userId, setUserId] = useState(Meteor.userId())

    const _login = () => {
        Meteor.loginWithPassword(user, password, err => {
            if(err) alert(err.reason)
            setUserId(Meteor.userId())
        })
    }

    const _register = () => {
        Accounts.createUser({ username: user, password: password }, err => {
            if (err) alert(err.reason)
            setUserId(Meteor.userId())
        })
    }

    const _exit = () => {
        Meteor.logout()
        setUserId(null)
    }

    if(userId) return (
        <div className="Login">
            <button onClick={_exit}>Logout</button>
        </div>
    )

    return (
        <div className="Login">
            <label htmlFor="user">User</label>
            <input type="text" value={user} onChange={ev => setUser(ev.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" value={password} onChange={ev => setPassword(ev.target.value)} />

            <button onClick={_login}>Login</button>
            <button onClick={_register}>Register</button>

        </div>
    )
}

export default Login