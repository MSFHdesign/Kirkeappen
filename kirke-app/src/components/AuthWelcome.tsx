import { useEffect, useState } from "react";
import { auth } from "../models/FBconfig";

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

  return <div>{userEmail ? `Velkommen ${userEmail}` : "NOT VELKOMMEN!"}</div>;
};

export default AuthWelcome;
