import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Banner from "./pages/BannerAdmin";
import Login from "./pages/Login";
import Gallery from "./pages/GalleryAdmin";
import Category from "./pages/Category";
import Category2 from "./pages/Category2";
import Category3 from "./pages/Category3";
import Client from "./pages/Client";
import Customer from "./pages/Customer";
import CareerGallery from "./pages/Career";
import TeamMembers from "./pages/TeamMembers";
import ChangePassword from "./pages/ChangePassword";
import Activities from "./pages/ActivitiesAdmin";
import ReviewAdmin from "./pages/ReviewsAdmin";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(localStorage.getItem("token") !== null);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {isAuthenticated && <Sidebar />}
      <div className="flex-1 flex flex-col">
        {isAuthenticated && <Navbar onLogout={handleLogout} />}
        <div className="p-8">
          <Routes>
            <Route path="/" element={isAuthenticated ? <Home /> : <Navigate to="/login" />} />
            <Route path="/banner" element={isAuthenticated ? <Banner /> : <Navigate to="/login" />} />
            <Route path="/gallery" element={isAuthenticated ? <Gallery /> : <Navigate to="/login" />} />
            <Route path="/category" element={isAuthenticated ? <Category /> : <Navigate to="/login" />} />
            <Route path="/category2" element={isAuthenticated ? <Category2 /> : <Navigate to="/login" />} />
            <Route path="/category3" element={isAuthenticated ? <Category3 /> : <Navigate to="/login" />} />
            <Route path="/client" element={isAuthenticated ? <Client /> : <Navigate to="/login" />} />
            <Route path="/leads" element={isAuthenticated ? <Customer /> : <Navigate to="/login" />} />
            <Route path="/career" element={isAuthenticated ? <CareerGallery /> : <Navigate to="/login" />} />
            <Route path="/team" element={isAuthenticated ? <TeamMembers /> : <Navigate to="/login" />} />
            <Route path="/activities" element={isAuthenticated ? <Activities /> : <Navigate to="/login" />} />
            <Route path="/reviews" element={isAuthenticated ? <ReviewAdmin /> : <Navigate to="/login" />} />
            <Route path="/change-password" element={isAuthenticated ? <ChangePassword /> : <Navigate to="/login" />} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
