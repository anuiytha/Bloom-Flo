import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/authContext/index'
import { doCreateUserWithEmailAndPassword } from '../firebase/auth'

const Register = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setconfirmPassword] = useState('')
    const [isRegistering, setIsRegistering] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')

    const { userLoggedIn } = useAuth()

    const onSubmit = async (e) => {
        e.preventDefault()

        // Clear previous error messages
        setErrorMessage('')

        // Validate password confirmation
        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match')
            return
        }

        // Validate password length
        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long')
            return
        }

        if (!isRegistering) {
            setIsRegistering(true)
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                // After successful registration, navigate directly to onboarding
                navigate('/onboarding')
            } catch (error) {
                console.error('Registration error:', error)
                setErrorMessage(error.message || 'Failed to create account. Please try again.')
                setIsRegistering(false)
            }
        }
    }

    return (
        <main className="register-bg">
            <div className="register-container">
                <div className="register-header">
                    <h2 className="register-title">🌸 Join BloomFlo.AI</h2>
                    <p className="register-subtitle">Start your journey to focus and flow</p>
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
                            disabled={isRegistering}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete='new-password'
                            required
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            className="form-input"
                            placeholder="Create a password"
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Confirm Password</label>
                        <input
                            disabled={isRegistering}
                            type="password"
                            autoComplete='off'
                            required
                            value={confirmPassword}
                            onChange={(e) => { setconfirmPassword(e.target.value) }}
                            className="form-input"
                            placeholder="Confirm your password"
                        />
                    </div>

                    {errorMessage && (
                        <div className="error-message">{errorMessage}</div>
                    )}

                    <button
                        type="submit"
                        disabled={isRegistering}
                        className={`register-btn ${isRegistering ? 'register-btn-disabled' : ''}`}
                    >
                        {isRegistering ? 'Creating Account...' : 'Create Account'}
                    </button>

                    <div className="login-link">
                        Already have an account? {' '}
                        <Link to={'/login'} className="link-text">Sign In</Link>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default Register