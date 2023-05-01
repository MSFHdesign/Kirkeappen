import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// globale CSS
import "./style/global.css";

import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./models/FBconfig";

// Compoonents
import AuthRoute from "./components/AuthRoute";
import DashBoard from "./pages/Dashboard";
import EditProfilePage from "./pages/EditProfilePage";
import StoryDisplay from "./components/StoryDisplay";
import StoryAdd from "./components/StoryAdd";
import { LanguageProvider } from "./components/LanguageContext";

initializeApp(firebaseConfig);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <DashBoard />
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
                <StoryDisplay collectionName="Åby kirkegård" />
              </AuthRoute>
            }
          />
          <Route
            path="/personlige"
            element={
              <AuthRoute>
                <StoryDisplay collectionName="Åbyhøj kirkegård" />
              </AuthRoute>
            }
          />
          <Route
            path="/approve"
            element={
              <AuthRoute>
                <StoryDisplay collectionName="approve" />
              </AuthRoute>
            }
          />
          <Route
            path="/historiske/add"
            element={
              <AuthRoute>
                <StoryAdd collectionName="Åby kirkegård" />
              </AuthRoute>
            }
          />
          <Route
            path="/personlige/add"
            element={
              <AuthRoute>
                <StoryAdd collectionName="Åbyhøj kirkegård" />
              </AuthRoute>
            }
          />

          <Route path="/login" element={<LoginPage />} />

          <Route
            path="*"
            element={
              <AuthRoute>
                <DashBoard />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
  );
};

export default Application;
