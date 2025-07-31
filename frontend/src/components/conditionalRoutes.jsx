import { useAuth } from '../contexts/authContext/index';
import { Navigate, useLocation } from 'react-router-dom';
import Home from '../pages/home';
import Onboarding from '../pages/onBoarding';

function ConditionalRoutes() {
    const { userLoggedIn, loading } = useAuth();
    const location = useLocation();

    // Show loading spinner while checking auth state
    if (loading) {
        return <div className="loading-spinner">Loading...</div>;
    }

    // If user is not logged in, redirect to login
    if (!userLoggedIn) {
        return <Navigate to="/login" />;
    }

    // Check if user came from registration (new user) or login (existing user)
    const isNewUser = location.state?.isNewUser || false;

    // If user is new (came from registration), redirect to onboarding
    if (isNewUser) {
        return <Navigate to="/onboarding" />;
    }

    // If user is existing (came from login), show home page
    return <Home />;
}

export default ConditionalRoutes;
