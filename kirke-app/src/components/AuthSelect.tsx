import { useEffect, useState } from "react";
import { auth, db } from "../models/FBconfig";
import { onSnapshot, doc } from "firebase/firestore";

interface Props {}

const AuthSelect: React.FC<Props> = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserEmail(user.email);
        setIsLoading(false);
      } else {
        setUserEmail(null);
      }
      console.log("user email is", userEmail);
    });
    return unsubscribe;
  }, [userEmail]);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const fetchUserData = async () => {
      if (userEmail) {
        setIsLoading(true); // set isLoading to true when fetching data
        const docRef = doc(db, "auth_user_data", userEmail);
        unsubscribe = onSnapshot(docRef, (doc) => {
          setUser(doc.data());
          setIsLoading(false); // set isLoading to false when data is fetched
        });
      }
    };

    if (userEmail !== null) {
      fetchUserData();
    }

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [userEmail]);

  const handleSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    localStorage.setItem("selectedValue", selectedValue);
    console.log(`Selected value "${selectedValue}" was added to local storage`);
  };

  if (userEmail === null) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>Vælg kirkegård</p>
      {user?.options && (
        <select value={selectedOption} onChange={handleSelection}>
          <option value="">Vælg</option>
          {user.options.map((option: string, index: number) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AuthSelect;
