import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { Link } from "react-router-dom";

export interface IHomePageProps {
  userEmail: string;
}

const HomePage: React.FunctionComponent<IHomePageProps> = (props) => {
  const auth = getAuth();

  return (
    <div>
      <h1>Home Page</h1>
      <h2>Welcome {props.userEmail}</h2>
      <Link to="/editProfile">
        <button>Edit Profile</button>
      </Link>
      <button onClick={() => signOut(auth)}>Sign out of Firebase</button>
    </div>
  );
};

export default HomePage;
