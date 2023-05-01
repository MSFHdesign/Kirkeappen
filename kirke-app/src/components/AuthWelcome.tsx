import { useEffect, useState } from "react";
import { auth } from "../models/FBconfig";

// This component looks into auth in firebase and gets the users Email
interface Props {}

const AuthWelcome: React.FC<Props> = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail(null);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div>
      <h4>{userEmail ? `Velkommen ${userEmail}` : "NOT VELKOMMEN!"}</h4>
      <p>Hvilken kirkegård ønsker du at arbejde på i dag?</p>
    </div>
  );
};

export default AuthWelcome;
