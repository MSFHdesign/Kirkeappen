import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { config } from "./models/FBconfig";
import AuthRoute from "./components/AuthRoute";
import HomePage from "./pages/HomePage";
import EditProfilePage from "./pages/EditProfilePage";

import { LanguageProvider } from "./models/LanguageContext";

initializeApp(config.firebaseConfig);

export interface IApplicationProps {}
const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userEmail, setUserEmail] = useState("");
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
    }
  }, []);
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <HomePage userEmail={userEmail} />
              </AuthRoute>
            }
          />
          <Route
            path="/editProfile"
            element={
              <AuthRoute>
                <EditProfilePage />
              </AuthRoute>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default Application;
