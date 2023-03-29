import { useLanguage } from "../components/LanguageContext";
import SignIn from "../components/signInWithEmail";
import login from "../style/login.module.css";
import logo from "../img/logo.svg";
import LanguageSwitcher from "../components/LanguageSwitcher";

export interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const { locale } = useLanguage();
  const home = locale.login;

  return (
    <div className={login.container}>
      <div className={login.language}>
        <LanguageSwitcher />
      </div>
      <div className={login.spacing}>
        <div className={login.img}>
          <img src={logo} alt="logo" />
        </div>
        <div className={login.inputfield}>
          <h2>{home.title}</h2>
          <SignIn />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
