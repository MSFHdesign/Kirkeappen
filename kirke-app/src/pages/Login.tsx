import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import style from "../style/warning.module.css";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [authing, setAuthing] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

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
        setError("Failed to log in");
        setShowAlert(true);
        setAuthing(false);
      });
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };

  return (
    <div>
      <p>Login</p>
      {showAlert && (
        <div className={style.alert}>
          <span className={style.closebtn} onClick={handleAlertClose}>
            &times;
          </span>
          <strong>{error} </strong>
        </div>
      )}

      <form onSubmit={signInWithEmail}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" disabled={authing}>
          Sign in with Email
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
