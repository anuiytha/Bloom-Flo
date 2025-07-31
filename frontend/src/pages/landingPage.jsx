import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/authContext/index";
import groupImg from "../../public/group.png";
import "../index.css";

export default function LandingPage() {
    const { userLoggedIn } = useAuth();

    // If user is already logged in, redirect to home
    if (userLoggedIn) {
        return <Navigate to="/home" replace={true} />;
    }

    return (
        <div className="landing-bg">
            <div className="landing-main-flex">
                <div className="landing-left" style={{ paddingRight: '0rem', marginLeft: '9rem' }}>
                    <h2 className="landing-title">🌸 Welcome to BloomFlo.AI – Where Focus Meets Flow</h2>
                    <p className="landing-desc"><b>BloomFlo.AI is a calming, AI–powered app designed for ADHD minds.</b></p>
                    <p className="landing-desc">
                        Track habits, boost focus, grow a virtual garden, and connect with a supportive community—all in a gamified, low-stim environment made just for you.
                    </p>
                    <p className="landing-desc landing-bullets">
                        ✨ <b>Focus smarter.</b><br />
                        🌱 Bloom gently. <span role="img" aria-label="purple heart">💜</span> Thrive your way.
                    </p>
                </div>
                <div className="landing-right">
                    <div className="logo">Bloom Flo</div>
                    <div className="lines-group">
                        <div className="vertical-line"></div>
                        <img src={groupImg} alt="Group" className="group-img" />
                        <div className="vertical-line"></div>
                    </div>
                    <Link to={'/register'} >
                        <button className="login-btn">LOGIN!</button>
                    </Link>
                </div>
            </div>
        </div >
    );
}