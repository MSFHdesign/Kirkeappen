import navigation from "../style/navigation.module.css";
import logo from "../img/logo.svg";
import SignOut from "./SignOut";
import EditProfilPage from "../pages/EditProfilePage";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import style from "../style/navigation.module.css";

type Props = {};

const Navigationsbar = (props: Props) => {
  return (
    <div className={style.container}>
      <div className={style.img}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={style.dropdown}>
        <button className={style.dropbtn}></button>
        <div className={style.dropdownContent}>
          <LanguageSwitcher />

          <SignOut />

          <EditProfilPage />
        </div>
      </div>
    </div>
  );
};

export default Navigationsbar;
