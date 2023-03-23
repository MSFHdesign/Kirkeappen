import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./models/FBconfig";
import AuthRoute from "./components/AuthRoute";
import DashBoard from "./pages/Dashboard";
import EditProfilePage from "./pages/EditProfilePage";
import Navigationsbar from "./components/navigationbar";
import StoryDisplay from "./components/StoryDisplay";
import StoryAdd from "./components/StoryAdd";
import { LanguageProvider } from "./components/LanguageContext";
import Navigationbar from "./components/navigationbar";

initializeApp(firebaseConfig);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const [userEmail, setUserEmail] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // add state variable
  useEffect(() => {
    const email = localStorage.getItem("userEmail");
    if (email) {
      setUserEmail(email);
      setIsAuthenticated(true); // set state to true if user email exists
    }
  }, []);
  return (
    <LanguageProvider>
      <Navigationbar />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <DashBoard userEmail={userEmail} />
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

          <Route
            path="/Historiske"
            element={
              <AuthRoute>
                <StoryDisplay collectionName="Kendte" />
                <StoryAdd collectionName="Kendte" />
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
