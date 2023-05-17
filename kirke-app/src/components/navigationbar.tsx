import React, { useState } from "react";
import logo from "../img/logo.svg";
import SignOut from "./SignOut";
import EditProfilPage from "../pages/EditProfilePage";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import style from "../style/navigation.module.css";

const Navigationsbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleMouseEnter = () => {
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    setShowDropdown(false);
  };

  return (
    <div className={style.container}>
      <div className={style.img}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div
        className={style.dropdown}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <button className={style.dropbtn} />
        {showDropdown && (
          <div className={style.dropdownContent}>
            <LanguageSwitcher />
            <SignOut />
            <EditProfilPage />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigationsbar;
