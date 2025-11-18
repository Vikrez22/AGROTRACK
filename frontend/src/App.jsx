import { Routes, Route } from "react-router-dom";

import LandingPage from "./components/Dashboard/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import HerderDashboard from "./components/Dashboard/HerderDashboard";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard";

import withUserId from "./components/Cowtracking/PrivateDashboardWrapper";

import LawEnforcementDashboard from "./components/IoTDashboard/admin";
import Marketplace from "./components/Marketplace/marketplace";

import NotFound from "./NotFound";

const HerderDashboardWithUser = withUserId(HerderDashboard);
const FarmerDashboardWithUser = withUserId(FarmerDashboard);

const App = () => (
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/login" element={<Login />} />

    <Route path="/admin-dashboard" element={<LawEnforcementDashboard />} />
    <Route path="/herder-dashboard" element={<HerderDashboardWithUser />} />
    <Route path="/farmer-dashboard" element={<FarmerDashboardWithUser />} />
    <Route path="/comingsoon" element={<Marketplace />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default App;
