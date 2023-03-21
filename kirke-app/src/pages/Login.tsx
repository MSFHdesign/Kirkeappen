import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useLanguage } from "../components/LanguageContext";
import SignIn from "../components/signInWithEmail";
import ResetPassword from "../components/ResetPassword";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { locale } = useLanguage();
  const home = locale.login;

  return (
    <div>
      <h2>{home.title}</h2>
      <SignIn />
      <ResetPassword />
    </div>
  );
};

export default LoginPage;
