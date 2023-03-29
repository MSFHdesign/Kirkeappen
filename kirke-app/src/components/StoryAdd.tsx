import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db, storage } from "../models/FBconfig";
import style from "../style/add.module.css";
import Logo from "../img/logo.svg";
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
  const [graveId, setgraveId] = useState("");
  const [sections, setSections] = useState<Section[]>([]);
  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [bornError, setBornError] = useState("");
  const [deathError, setDeathError] = useState("");
  const [graveIdError, setgraveIdError] = useState("");

  const [file, setFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [progress, setProgress] = useState(0);

  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

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
    let hasErrors = false;
    // Reset error messages
    setFirstNameError("");
    setLastNameError("");
    setBornError("");
    setDeathError("");
    setgraveIdError("");

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
    if (!graveId.trim()) {
      setgraveIdError(story.error.graveID);
      hasErrors = true;
    }

    // Check if all fields are valid
    if (hasErrors) {
      setHasError(true);
      setTimeout(() => {
        setHasError(false);
      }, 5000);
      return;
    }

    try {
      if (file) {
        const storageRef = ref(storage, "images/" + file.name);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
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
            setHasError(true);
          },
          () => {
            // Handle successful upload
            getDownloadURL(uploadTask.snapshot.ref)
              .then(async (downloadURL) => {
                setImageUrl(downloadURL); // Set imageUrl to the download URL
                const docRef = await addDoc(
                  collection(db, props.collectionName),
                  {
                    firstName: firstName,
                    lastName: lastName,
                    born: born,
                    death: death,
                    graveId: graveId,
                    sections: sections ? sections : [],
                    imageUrl: downloadURL, // Use download URL as imageUrl
                    timestamp: new Date(),
                  }
                );

                // Reset the form inputs
                setFirstName("");
                setLastName("");
                setBorn("");
                setDeath("");
                setgraveId("");
                setSections([]);
                setFile(null);
                setProgress(0);
              })
              .catch((error) => {
                // Handle errors
                setHasError(true);
                console.error(error);
              });
          }
        );
      } else {
        const docRef = await addDoc(collection(db, props.collectionName), {
          firstName: firstName,
          lastName: lastName,
          born: born,
          death: death,
          graveId: graveId,
          sections: sections ? sections : [],
          imageUrl: imageUrl, // Use download URL as imageUrl
          timestamp: new Date(),
        });
        setIsSuccess(true);
        setTimeout(() => {
          setIsSuccess(false);
        }, 5000);
        console.log("Document written with ID: ", docRef.id);
      }
      // Reset the form inputs
      setFirstName("");
      setLastName("");
      setBorn("");
      setDeath("");
      setgraveId("");
      setSections([]);
      setFile(null);
      setProgress(0);
      const formElement = e.currentTarget;
      formElement.reset();
    } catch (error) {
      console.error("Error adding document: ", error);
    }
    console.log(graveId);
  };
  const handleReset = () => {
    setFirstName("");
    setLastName("");
    setBorn("");
    setDeath("");
    setgraveId("");
    setSections([]);
    setFile(null);
    setImageUrl("");
    setProgress(0);
    setHasError(false);
    setIsSuccess(false);
    setFirstNameError("");
    setLastNameError("");
    setBornError("");
    setDeathError("");
    setgraveIdError("");
  };

  return (
    <div className={style.addWrapper}>
      <form
        className={style.formData}
        onReset={handleReset}
        onSubmit={handleSubmit}
      >
        <div className={style.topBar}>
          <div className={style.leftSide}>
            <div className={style.nameBox}>
              <div className={style.dirLod}>
                <span className={style.contentWrap}>
                  <label htmlFor="firstName">{story.firstName}:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                  {firstNameError && (
                    <span className={style.error}>{firstNameError}</span>
                  )}
                </span>
                <span className={style.contentWrap}>
                  <label htmlFor="graveId">{story.graveID}</label>
                  <input
                    type="number"
                    id="graveId"
                    value={graveId}
                    onChange={(e) => setgraveId(e.target.value)}
                  />

                  {graveIdError && (
                    <span className={style.error}>{graveIdError}</span>
                  )}
                </span>
              </div>
              <span className={style.contentWrap}>
                <label htmlFor="lastName">{story.lastName}:</label>
                <input
                  type="text"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
                {lastNameError && (
                  <span className={style.error}>{lastNameError}</span>
                )}
              </span>
            </div>
          </div>
          <div className={style.dirLod}>
            <span className={style.contentWrap}>
              <label htmlFor="born">{story.born}:</label>
              <input
                type="date"
                id="born"
                value={born}
                onChange={(e) => setBorn(e.target.value)}
                required
              />
              {bornError && <span className={style.error}>{bornError}</span>}
            </span>
            <span className={style.contentWrap}>
              <label htmlFor="death">{story.dead}:</label>
              <input
                type="date"
                id="death"
                value={death}
                onChange={(e) => setDeath(e.target.value)}
                required
              />
              {deathError && <span className={style.error}>{deathError}</span>}
            </span>
          </div>
        </div>
        <div className={style.contentWrap}>
          <div className={style.addImg}>
            <label className={style.imgUploader} htmlFor="image">
              <span>{story.img}:</span>
              <img
                className={style.img}
                src={file ? URL.createObjectURL(file) : imageUrl || Logo}
                alt={"billede af " + firstName + lastName}
              />
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />
          </div>
          <div className={style.progressContainer}>
            <progress className={style.ulProcess} value={progress} max="100" />
            <span className={style.progressLabel}>{`${progress}%`}</span>
          </div>
        </div>

        <span className={style.sectionWrap}>
          <label>{story.section.sectionTitle}:</label>
          {sections.map((section, index) => (
            <div key={index} className={style.section}>
              <div className={style.sectionInputs}>
                <div className={style.sectionFlex}>
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
                    required
                  />
                </div>

                <textarea
                  className={style.textarea}
                  placeholder={story.section.description}
                  value={section.description}
                  onChange={(e) =>
                    handleSectionChange(index, "description", e.target.value)
                  }
                  required
                />
              </div>
            </div>
          ))}
          <span className={style.addSectionBtnbar}>
            <button
              className={style.addSectionButton}
              type="button"
              onClick={handleAddSection}
            >
              {story.section.addSection}
            </button>
          </span>
        </span>

        <span className={style.buttonBar}>
          <button className={style.resetBtn} type="reset">
            {story.reset}
          </button>
          <button className={style.submitBtn} type="submit">
            {story.submit}
          </button>
        </span>
        {hasError && (
          <div className={style.Error}>
            <h3> {story.error.submit.fail}</h3>
            <button onClick={() => setHasError(false)}>×</button>
          </div>
        )}

        {isSuccess && (
          <div className={style.warningSucces}>
            <h3>{story.error.submit.succes}</h3>
            <button onClick={() => setIsSuccess(false)}>×</button>
          </div>
        )}
      </form>
    </div>
  );
};
export default AddPersonComponent;
