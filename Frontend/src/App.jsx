import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import QRPage from "./Pages/QRPage";
import MenuPage from "./Pages/MenuPage";
import Login from "./components/Login";
import AdminDash from "./Pages/AdminDash";
import ThankYouPage from "./components/ThankYouPage";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<QRPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <AdminDash />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
