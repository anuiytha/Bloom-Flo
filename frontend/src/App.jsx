// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/landingPage';
import Register from './components/register';
import Login from './components/login';
import Logout from './components/logout';
import Navbar from './components/navbar';
import Onboarding from "./pages/onBoarding";
import Home from './pages/home';
import ConditionalRoutes from './components/conditionalRoutes';


function App() {
  return (
    <>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/home" element={<Home />} />
            <Route path="/home" element={<ConditionalRoutes />} />
            <Route path="*" element={<ConditionalRoutes />} />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
