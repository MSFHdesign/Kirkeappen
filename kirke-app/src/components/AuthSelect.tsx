import { useEffect, useState } from "react";
import { auth, db } from "../models/FBconfig";
import { onSnapshot, doc } from "firebase/firestore";

import style from "../style/authSelect.module.css";

// This component gets the users auth kirkegårde, from the firebase show in a modal.
interface Props {}

const AuthSelect: React.FC<Props> = () => {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  const [, setIsLoading] = useState<boolean>(true);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [filter, setFilter] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const selectedValue =
    localStorage.getItem("selectedValue") || "Vælg kirkegård";
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

  const handleOptionClick = (option: string) => {
    localStorage.setItem("selectedValue", option);
    setSelectedOption(option);
    console.log(`Selected value "${option}" was added to local storage`);
    setShowModal(false);
    window.location.reload();
  };

  const handleFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  if (userEmail === null) {
    return (
      <span>
        <p className={style.loading}>Loading...</p>
      </span>
    );
  }

  return (
    <div className={style.container}>
      {user?.options && (
        <div>
          <button
            className={style.selectButton}
            onClick={() => setShowModal((prevShowModal) => !prevShowModal)}
          >
            {selectedValue}
          </button>
          {showModal && (
            <div className={style.modal}>
              <input
                className={style.filter}
                type="text"
                placeholder="Søg efter en kirkegård"
                value={filter}
                onChange={handleFilter}
              />
              <div className={style.optionContainer}>
                {user.options
                  .filter((option: string) =>
                    option.toLowerCase().includes(filter.toLowerCase())
                  )
                  .map((option: string, index: number) => (
                    <div
                      className={style.option}
                      key={index}
                      onClick={() => handleOptionClick(option)}
                    >
                      {option}
                    </div>
                  ))}
              </div>
              <button
                className={style.selectButton}
                onClick={() => setShowModal((prevShowModal) => !prevShowModal)}
              >
                Luk
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthSelect;
