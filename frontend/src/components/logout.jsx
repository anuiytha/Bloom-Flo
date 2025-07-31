import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/authContext/index';
import { doSignOut } from '../firebase/auth';
import '../index.css';

const Logout = () => {
    const navigate = useNavigate();
    const { userLoggedIn } = useAuth();
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(true);

    const handleLogout = async () => {
        setIsLoggingOut(true);
        try {
            await doSignOut();
            // Redirect to landing page after successful logout
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
            setIsLoggingOut(false);
        }
    };

    const handleCancel = () => {
        navigate(-1); // Go back to previous page
    };

    // If user is not logged in, redirect to landing page
    if (!userLoggedIn) {
        return <Navigate to="/" replace={true} />;
    }

    return (
        <div className="logout-bg">
            <div className="logout-container">
                <div className="logout-header">
                    <h2 className="logout-title">🌸 Goodbye from BloomFlo.AI</h2>
                    <p className="logout-subtitle">Are you sure you want to sign out?</p>
                </div>

                {showConfirmation && (
                    <div className="logout-content">
                        <div className="logout-message">
                            <p>We'll miss you! 🌱</p>
                            <p>Your progress and data will be saved for when you return.</p>
                        </div>

                        <div className="logout-actions">
                            <button
                                onClick={handleLogout}
                                disabled={isLoggingOut}
                                className={`logout-btn logout-confirm ${isLoggingOut ? 'logout-btn-disabled' : ''}`}
                            >
                                {isLoggingOut ? 'Signing Out...' : 'Yes, Sign Out'}
                            </button>

                            <button
                                onClick={handleCancel}
                                disabled={isLoggingOut}
                                className="logout-btn logout-cancel"
                            >
                                Stay Here
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Logout; 