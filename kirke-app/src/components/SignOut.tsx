import React from "react";
import { getAuth, signOut } from "firebase/auth";

interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = () => {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {}
  };

  return <button onClick={handleSignOut}>Sign out of Firebase</button>;
};

export default SignOut;
