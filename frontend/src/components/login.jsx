import React, { useState } from 'react'
import { Navigate, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext/index'
import { doSignInWithEmailAndPassword } from '../firebase/auth'

const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoggingIn, setIsLoggingIn] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()

        // Clear previous error messages
        setErrorMessage('')

        if (!isLoggingIn) {
            setIsLoggingIn(true)
            try {
                await doSignInWithEmailAndPassword(email, password)
                // After successful login, navigate to home as existing user
                navigate('/home', { state: { isNewUser: false } })
            } catch (error) {
                console.error('Login error:', error)
                setErrorMessage(error.message || 'Failed to sign in. Please check your credentials.')
                setIsLoggingIn(false)
            }
        }
    }

    return (
        <>
            {/* Only redirect to home if user is already logged in */}
            {userLoggedIn && (<Navigate to={'/home'} replace={true} />)}

            <main className="register-bg">
                <div className="register-container">
                    <div className="register-header">
                        <h2 className="register-title">🌸 Welcome Back to BloomFlo.AI</h2>
                        <p className="register-subtitle">Continue your journey to focus and flow</p>
                    </div>

                    <form onSubmit={onSubmit} className="register-form">
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                autoComplete='email'
                                required
                                value={email}
                                onChange={(e) => { setEmail(e.target.value) }}
                                className="form-input"
                                placeholder="Enter your email"
                                disabled={isLoggingIn}
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">Password</label>
                            <input
                                disabled={isLoggingIn}
                                type="password"
                                autoComplete='current-password'
                                required
                                value={password}
                                onChange={(e) => { setPassword(e.target.value) }}
                                className="form-input"
                                placeholder="Enter your password"
                            />
                        </div>

                        {errorMessage && (
                            <div className="error-message">{errorMessage}</div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoggingIn}
                            className={`register-btn ${isLoggingIn ? 'register-btn-disabled' : ''}`}
                        >
                            {isLoggingIn ? 'Signing In...' : 'Sign In'}
                        </button>

                        <div className="login-link">
                            Don't have an account? {' '}
                            <Link to={'/register'} className="link-text">Create Account</Link>
                        </div>
                    </form>
                </div>
            </main>
        </>
    )
}

export default Login