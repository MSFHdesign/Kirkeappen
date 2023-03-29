import React, { useState } from "react";
import { getAuth, updatePassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import style from "../style/editProfil.module.css";

export interface IEditProfilPageProps {}

const EditProfilPage: React.FunctionComponent<IEditProfilPageProps> = (
  props
) => {
  const auth = getAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [authing, setAuthing] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setAuthing(true);

    if (newPassword !== confirmPassword) {
      setError("Passwords dont match");
      setShowAlert(true);
      setAuthing(false);
      return;
    }

    try {
      await updatePassword(auth.currentUser!, newPassword);
      console.log("Password updated successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      setError("Failed to update password");
      setShowAlert(true);
      setAuthing(false);
    }
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  };
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  return (
    <div className={style.container}>
      {showAlert ? (
        <div className={style.alert}>
          <span className={style.closebtn} onClick={handleAlertClose}>
            &times;
          </span>
          <strong>{error} </strong>
        </div>
      ) : (
        <div></div>
      )}
      {isModalOpen ? (
        <form onSubmit={handleSubmit}>
          <label htmlFor="new-password">New Password:</label>
          <input
            type="password"
            name="new-password"
            id="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <label htmlFor="confirm-password">Confirm Password:</label>
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" disabled={authing}>
            Update
          </button>
        </form>
      ) : (
        <div>
          <button type="button" onClick={handleModalOpen}>
            skift password
          </button>
        </div>
      )}
    </div>
  );
};

export default EditProfilPage;
