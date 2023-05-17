import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// global CSS
import "./style/global.css";

import LoginPage from "./pages/Login";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "./models/FBconfig";

// Components
import AuthRoute from "./components/AuthRoute";
import DashBoard from "./pages/Dashboard";
import EditProfilePage from "./pages/EditProfilePage";
import StoryDisplay from "./components/StoryDisplay";
import StoryAdd from "./components/StoryAdd";
import DisplayComment from "./components/CommentDisplay";
import { LanguageProvider } from "./components/LanguageContext";

// This is the overall structure of the page. Each route that needs an auth-person have to pass thrue it. If they do not, they will be placed to the login screen. As we do not want un-auth personal to go thrue the door.

initializeApp(firebaseConfig);

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
  const selectedValue =
    localStorage.getItem("selectedValue") || "Ingen kirkegård valgt";

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
                <StoryDisplay collectionName={selectedValue} />
              </AuthRoute>
            }
          />

          <Route
            path="/approve"
            element={
              <AuthRoute>
                <DisplayComment collectionName={selectedValue} />
              </AuthRoute>
            }
          />
          <Route
            path="/historiske/add"
            element={
              <AuthRoute>
                <StoryAdd collectionName={selectedValue} />
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
