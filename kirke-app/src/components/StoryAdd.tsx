import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/add.module.css";
import { useLanguage } from "../components/LanguageContext";

interface Props {
  collectionName: string;
}

interface Section {
  [key: string]: string;
  title: string;
  description: string;
}

const AddPersonComponent: React.FC<Props> = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [born, setBorn] = useState("");
  const [death, setDeath] = useState("");
  const [graveNumber, setGraveNumber] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bornError, setBornError] = useState("");
  const [deathError, setDeathError] = useState("");
  const [graveNumberError, setGraveNumberError] = useState("");

  // Text
  const { locale } = useLanguage();
  const story = locale.story;
  
  const handleSectionChange = (index: number, field: string, value: string) => {
    const updatedSections = [...sections];
    updatedSections[index][field] = value;
    setSections(updatedSections);
  };

  const handleAddSection = () => {
    setSections([...sections, { title: "", description: "" }]);
  };

  const handleRemoveSection = (index: number) => {
    const updatedSections = [...sections];
    updatedSections.splice(index, 1);
    setSections(updatedSections);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setBornError("");
    setDeathError("");
    setGraveNumberError("");

    let hasErrors = false;

    // Check if fields are not empty
    if (!firstName.trim()) {
      setFirstNameError(story.error.firstName);
      hasErrors = true;
    }
    if (!lastName.trim()) {
      setLastNameError(story.error.lastName);
      hasErrors = true;
    }
    if (!born.trim()) {
      setBornError(story.error.born);
      hasErrors = true;
    }
    if (!death.trim()) {
      setDeathError(story.error.dead);
      hasErrors = true;
    }
    if (!graveNumber.trim()) {
      setGraveNumberError(story.error.graveID);
      hasErrors = true;
    }

    // Check if all fields are valid
    if (hasErrors) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, props.collectionName), {
        firstName,
        lastName,
        born,
        death,
        graveNumber,
        sections,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form inputs
      setFirstName("");
      setLastName("");
      setBorn("");
      setDeath("");
      setGraveNumber("");
      setSections([]);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={style.formGroup}>
          <label htmlFor="firstName">{story.firstName}:</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          {firstNameError && (
            <span className={style.error}>{firstNameError}</span>
          )}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="lastName">{story.lastName}:</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {lastNameError && (
            <span className={style.error}>{lastNameError}</span>
          )}
        </div>

        <div className={style.formGroup}>
          <label htmlFor="born">{story.born}:</label>
          <input
            type="date"
            id="born"
            value={born}
            onChange={(e) => setBorn(e.target.value)}
          />
          {bornError && <span className={style.error}>{bornError}</span>}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="death">{story.dead}:</label>
          <input
            type="date"
            id="death"
            value={death}
            onChange={(e) => setDeath(e.target.value)}
          />
          {deathError && <span className={style.error}>{deathError}</span>}
        </div>
        <div className={style.formGroup}>
          <label htmlFor="graveNumber">{story.graveID}</label>
          <input
            type="text"
            id="graveNumber"
            value={graveNumber}
            onChange={(e) => setGraveNumber(e.target.value)}
          />
          {graveNumberError && (
            <span className={style.error}>{graveNumberError}</span>
          )}
        </div>
        <div className={style.formGroup}>
          <label>{story.section.sectionTitle}:</label>
          {sections.map((section, index) => (
            <div key={index} className={style.section}>
              <div className={style.sectionInputs}>
                <button
                  type="button"
                  className={style.removeSectionButton}
                  onClick={() => handleRemoveSection(index)}
                >
                  {story.section.remove}
                </button>
                <input
                  type="text"
                  placeholder={story.section.title}
                  value={section.title}
                  onChange={(e) =>
                    handleSectionChange(index, "title", e.target.value)
                  }
                />
                <input
                  type="text"
                  placeholder={story.section.description}
                  value={section.description}
                  onChange={(e) =>
                    handleSectionChange(index, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}
          <button type="button" onClick={handleAddSection}>
            {story.section.addSection}
          </button>
        </div>
        <button type="submit">{story.submit}</button>
      </form>
    </>
  );
};
export default AddPersonComponent;
