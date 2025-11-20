import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./context/AuthContext";
import RoleRoute from "./components/Auth/RoleRoute";

import LandingPage from "./components/Dashboard/LandingPage";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";

import HerderDashboard from "./components/Dashboard/HerderDashboard";
import FarmerDashboard from "./components/Dashboard/FarmerDashboard/FarmerDashboard";

import withUserId from "./components/Cowtracking/PrivateDashboardWrapper";

import LawEnforcementDashboard from "./components/IoTDashboard/admin";
import Marketplace from "./components/Marketplace/marketplace";

import NotFound from "./NotFound";

// const HerderDashboardWithUser = withUserId(HerderDashboard);
// const FarmerDashboardWithUser = withUserId(FarmerDashboard);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route
          path="/admin-dashboard"
          element={
            <RoleRoute allowed={["admin"]}>
              <LawEnforcementDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/herder-dashboard"
          element={
            <RoleRoute allowed={["herder"]}>
              <HerderDashboard />
            </RoleRoute>
          }
        />
        <Route
          path="/farmer-dashboard"
          element={
            <RoleRoute allowed={["farmer"]}>
              <FarmerDashboard />
            </RoleRoute>
          }
        />
        <Route path="/comingsoon" element={<Marketplace />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
