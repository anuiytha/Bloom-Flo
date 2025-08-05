import React from 'react';
import VisionBoard from '../components/visionBoard';
import Navbar from '../components/navbar';

export default function Home() {
    return (
        <div className="home-container">
            <Navbar />

            <div className="home-main-content">
                {/* Left Section - Vision Board/Inspiration */}
                <div className="home-left-section">
                    <div className="vision-board-section">
                        <VisionBoard />
                    </div>
                    <div className="calendar-section">
                        <div className="calendar-2024">
                            <h3>2024</h3>
                            <div className="calendar-grid">
                                {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
                                    <div key={month} className="calendar-month">{month}</div>
                                ))}
                            </div>
                        </div>
                        <div className="calendar-side-box"></div>
                    </div>
                </div>

                {/* Middle Section - Today's Plan & Focus */}
                <div className="home-middle-section">
                    <div className="todays-plan-section">
                        <h2 className="section-title">TODAY'S PLAN</h2>
                        <div className="plan-box">
                            <div className="plan-content">
                                <div className="plan-item">
                                    <span className="checkmark">✓</span>
                                    <span>Complete math worksheet (+50 XP)</span>
                                </div>
                                <div className="plan-item">
                                    <span className="checkmark">✓</span>
                                    <span>Read 30 minutes (+30 XP)</span>
                                </div>
                                <div className="plan-item">
                                    <span className="checkmark">✓</span>
                                    <span>Exercise for 20 minutes (+40 XP)</span>
                                </div>
                                <div className="plan-item">
                                    <span className="checkmark">✓</span>
                                    <span>Practice meditation (+25 XP)</span>
                                </div>
                            </div>
                            <div className="plan-illustration">👩‍🎓</div>
                        </div>
                        <div className="small-boxes-row">
                            <div className="small-box"></div>
                            <div className="small-box"></div>
                        </div>
                    </div>

                    <div className="focus-section">
                        <h2 className="section-title">Let your focus bloom gently today.</h2>
                        <div className="focus-box">
                            <div className="focus-item">
                                <span className="checkmark">✓</span>
                                <span>Stay hydrated throughout the day</span>
                            </div>
                            <div className="focus-item">
                                <span className="checkmark">✓</span>
                                <span>Take breaks every 45 minutes</span>
                            </div>
                            <div className="focus-item">
                                <span className="checkmark">✓</span>
                                <span>Practice gratitude journaling</span>
                            </div>
                        </div>
                        <div className="small-boxes-row">
                            <div className="small-box"></div>
                            <div className="small-box"></div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Community Zone & Recommended Courses */}
                <div className="home-right-section">
                    <div className="community-section">
                        <h2 className="section-title">COMMUNITY ZONE</h2>
                        <div className="community-box"></div>
                        <div className="small-boxes-column">
                            <div className="small-box"></div>
                            <div className="small-box"></div>
                        </div>
                    </div>

                    <div className="courses-section">
                        <h2 className="section-title">Recommended Courses</h2>
                        <div className="courses-box"></div>
                        <div className="small-boxes-column">
                            <div className="small-box"></div>
                            <div className="small-box"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Character Illustration */}
            <div className="character-illustration">
                <div className="character">👩</div>
            </div>
        </div>
    );
}