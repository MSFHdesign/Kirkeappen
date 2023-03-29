import navigation from "../style/navigation.module.css";
import logo from "../img/logo.svg";
import SignOut from "./SignOut";
import EditProfilPage from "../pages/EditProfilePage";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";

type Props = {};

const Navigationsbar = (props: Props) => {
  return (
    <div className={navigation.container}>
      <div className={navigation.img}>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className={navigation.dropdown}>
        <button className={navigation.dropbtn}></button>
        <div className={navigation.dropdownContent}>
          <p className={navigation.language}>
            <LanguageSwitcher />
          </p>
          <p>
            <SignOut />
          </p>
          <p>
            <EditProfilPage />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navigationsbar;
