// App.tsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { useAuth } from "./context/auth-context";
import HomePage from "./pages/Home";
import ItemDetailPage from "./pages/Itemsdetails";
import LoginPage from "./pages/Login";
import SignUpPage from "./pages/SignUp";

const App: React.FC = () => {
  const { accessToken } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />

      {/* Apply ProtectedRoute directly on the component, not as Route */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/item"
        element={
          <ProtectedRoute>
            <ItemDetailPage />
          </ProtectedRoute>
        }
      />

      {/* Redirect to /items if authenticated, else to /login */}
      <Route
        path="/"
        element={<Navigate to={accessToken ? "/home" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
