import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import style from "../style/warning.module.css";
import { useLanguage } from "../models/LanguageContext";
import LanguageSwitcher from "../components/LanguageSwitcher";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const { locale } = useLanguage();
  const home = locale.login;

  const signInWithEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthing(true);

    signInWithEmailAndPassword(auth, email, password)
      .then((response) => {
        console.log(response.user.uid);
        localStorage.setItem("userEmail", email);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        setShowAlert(true);
        setAuthing(false);
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <p>{home.title}</p>
      {showAlert && (
        <div className={style.alert}>
          <span className={style.closebtn} onClick={handleAlertClose}>
            &times;
          </span>
          <strong>{locale.error.loginFailed}</strong>
        </div>
      )}

      <form onSubmit={signInWithEmail}>
        <input
          type="email"
          placeholder={home.email}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder={home.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={authing}>
          {home.submit}
        </button>
      </form>
      <br />
      <LanguageSwitcher></LanguageSwitcher>
    </div>
  );
};

export default LoginPage;
