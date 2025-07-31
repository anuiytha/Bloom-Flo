import React from "react";
import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
    return (
        <>

            <nav className="nav-bar">
                <div className="nav-left">
                    <div className="nav-logo">Bloom <span className="nav-flo">FLO.</span></div>
                </div>
                <div className="nav-center">
                    <a href="#" className="nav-link">BIO</a>
                    <a href="#" className="nav-link">PORTFOLIO</a>
                    <a href="#" className="nav-link">PODCAST</a>
                    <a href="#" className="nav-link">BLOG</a>
                </div>
                <div className="nav-right">
                    <div className="search-bar">
                        <i className="search-icon">🔍</i>
                        <input type="text" placeholder="Search..." className="search-input" />
                    </div>
                    <div className="user-info">
                        <span className="lightning-icon">⚡</span>
                        <span className="notification-count">2</span>
                        <span className="username">[username]</span>
                        <div className="user-avatar">👤</div>
                        <Link to="/logout" className="logout-nav-btn">
                            <button className="logout-button">Logout</button>
                        </Link>
                    </div>
                </div>
            </nav>
        </>
    )
}