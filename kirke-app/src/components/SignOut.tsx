import React from "react";
import { getAuth, signOut } from "firebase/auth";

// this component is a signout component, that call a funktions from auth and logging the user out.
// it also clear the local storage from any values. So any uninspected snoopers can get inside.

interface SignOutProps {}

const SignOut: React.FC<SignOutProps> = () => {
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      // Remove the localStorage item here
      localStorage.removeItem("selectedValue");
      localStorage.removeItem("userEmail");

      // Sign out the user
      await signOut(auth);
    } catch (error) {}
  };

  return <button onClick={handleSignOut}>log ud</button>;
};

export default SignOut;
