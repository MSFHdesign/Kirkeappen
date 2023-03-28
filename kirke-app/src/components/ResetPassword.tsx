import React, { useState, useEffect } from "react";
import {
  getAuth,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "./LanguageContext";
import login from "../style/login.module.css";

type Props = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

const ResetPassword: React.FC<Props> = ({ onSuccess, onError }) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const { locale } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleResetPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(auth, email);
      if (onSuccess) onSuccess();
      setLoading(false);
    } catch (error) {
      if (onError) onError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, [auth, navigate]);

  if (loading) return <p>Loading ...</p>;

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={login.button}>
      {isModalOpen ? (
        <div>
          <label htmlFor="email">{locale.login.ResetLabel}</label>
          <input
            type="email"
            id="email"
            placeholder={locale.login.email}
            value={email}
            onChange={handleEmailChange}
          />
          <button onClick={handleResetPassword}>
            {locale.login.ResetPassword}
          </button>
        </div>
      ) : (
        <div className={login.buttonStyling}>
          <button type="button" onClick={handleModalOpen}>
            Glemt password?
          </button>
        </div>
      )}
    </div>
  );
};

export default ResetPassword;
