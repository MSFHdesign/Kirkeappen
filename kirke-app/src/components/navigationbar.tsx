import navigation from "../style/navigation.module.css";
import logo from "../img/logo.svg";
import SignOut from "./SignOut";
import EditProfilPage from "../pages/EditProfilePage";

type Props = {};

const Navigationsbar = (props: Props) => {
  return (
    <div className={navigation.container}>
      <div className={navigation.img}>
        <img src={logo} alt="logo" />
      </div>
      <div className={navigation.dropdown}>
        <button className={navigation.dropbtn}></button>
        <div className={navigation.dropdownContent}>
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
