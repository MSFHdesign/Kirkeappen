import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../models/FBconfig";
import style from "../style/add.module.css";
import { useLanguage } from "./LanguageContext";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

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

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [isSuccess, setIsSuccess] = useState(false);
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
    setIsSuccess(true);
    try {
      if (file) {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask.on(
          "state_changed",
          (snapshot: { bytesTransferred: number; totalBytes: number }) => {
            // Handle progress
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            setProgress(progress);
          },
          (error) => {
            // Handle errors
            console.error(error);
          },
          () => {
            // Handle successful upload
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                console.log("File available at", downloadURL);
                setImageUrl(downloadURL); // Set imageUrl to the download URL
                const docRef = await addDoc(
                  collection(db, props.collectionName),
                  {
                    firstName,
                    lastName,
                    born,
                    death,
                    graveNumber,
                    sections,
                    imageUrl: downloadURL, // Use download URL as imageUrl
                    timestamp: new Date(),
                  }
                );
                console.log("Document written with ID: ", docRef.id);
                // Reset the form inputs
                setFirstName("");
                setLastName("");
                setBorn("");
                setDeath("");
                setGraveNumber("");
                setSections([]);
                setFile(null);
              })
              .catch((error) => {
                // Handle errors
                console.error(error);
              });
          }
        );
      } else {
        const docRef = await addDoc(collection(db, props.collectionName), {
          firstName,
          lastName,
          born,
          death,
          graveNumber,
          sections,
          imageUrl, // Add image URL to document
          timestamp: new Date(),
        });

        console.log("Document written with ID: ", docRef.id);
      }
      // Reset the form inputs
      setFirstName("");
      setLastName("");
      setBorn("");
      setDeath("");
      setGraveNumber("");
      setSections([]);
      setFile(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <div className={style.addWrapper}>
      <form className={style.formData} onSubmit={handleSubmit}>
        <div className={style.topBar}>
          <div className={style.leftSide}>
            <div className={style.nameBox}>
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
          </div>

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
        <div className={style.rightSide}>
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
        </div>
        <div className={style.addImg}>
          <label className={style.imgUploader} htmlFor="image">
            <span>Choose an image</span>
            <svg viewBox="0 0 24 24">
              <path d="M17 12l-5-5-1.41 1.41L14.17 11H4v2h10.17l-3.58 3.58L12 17l7-7z" />
            </svg>
          </label>
          <input
            type="file"
            id="image"
            accept="image/*"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <progress value={progress} max="100" />
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
        <button className={style.submitBtn} type="submit">
          {story.submit}
        </button>
        <div className={style.warningSucces}>
          {isSuccess && <h3>Form submitted successfully!</h3>}
        </div>
      </form>
    </div>
  );
};
export default AddPersonComponent;
