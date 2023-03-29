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

  return <button onClick={handleSignOut}>log ud</button>;
};

export default SignOut;
