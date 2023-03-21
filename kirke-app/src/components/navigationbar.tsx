import LanguageSwitcher from "../components/LanguageSwitcher";
import SignOut from "./SignOut";

type Props = {};

const Navigationsbar = (props: Props) => {
  return (
    <div>
      <LanguageSwitcher />
      <SignOut />
    </div>
  );
};

export default Navigationsbar;
