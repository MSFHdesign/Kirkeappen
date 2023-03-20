import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

import { useLanguage } from "../components/LanguageContext";

export interface IDashBoardProps {
  userEmail: string;
}

const DashBoard: React.FunctionComponent<IDashBoardProps> = (props) => {
  const auth = getAuth();
  const { locale } = useLanguage();
  const dash = locale.dashboard;
  return (
    <div>
      <h1>{dash.title}</h1>
      <h2>
        {dash.welcomeMessage} <br />
        <strong>{props.userEmail}</strong>
      </h2>
      <Link to="/editProfile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
    </div>
  );
};

export default DashBoard;
