import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../contexts/authContext/index';
import "../index.css";

export default function Onboarding() {
    const { currentuser } = useAuth();
    const navigate = useNavigate();

    const completeOnboarding = () => {
        // Navigate to home page after completing onboarding
        navigate("/home");
    };

    return (
        <div className="new-users-bg">
            <main className="main-content">
                <div className="welcome-section">
                    <h1 className="welcome-title">🌸 Welcome to BloomFlo.AI</h1>
                    <p className="welcome-subtitle">Start your bloom journey</p>
                </div>

                <div className="feature-cards">
                    <div className="feature-card">
                        <div className="card-icon">⏳</div>
                        <h3 className="card-title">FOCUS TOOLKIT</h3>
                        <p className="card-description">Timer and task manager</p>
                    </div>

                    <div className="feature-card">
                        <div className="card-icon">👥</div>
                        <h3 className="card-title">COMMUNITY ZONE</h3>
                        <p className="card-description">Connect with others</p>
                    </div>

                    <div className="feature-card">
                        <div className="card-icon">📚</div>
                        <h3 className="card-title">LEARN SECTION</h3>
                        <p className="card-description">Educational Resources</p>
                    </div>
                </div>

                {/* Finish Button */}
                <div className="text-center mt-6">
                    <button onClick={completeOnboarding} className="onboarding-finish-btn">
                        🌱 Finish & Enter Dashboard
                    </button>
                </div>
            </main>

            <div className="character-section">
                <div className="character-container">
                    <div className="speech-bubble">
                        <p>Welcome {currentuser?.displayName || "friend"} 💜</p>
                    </div>
                    <div className="character-avatar">👩</div>
                </div>
            </div>
        </div>
    );
}
