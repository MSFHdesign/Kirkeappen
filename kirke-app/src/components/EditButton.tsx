import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../models/FBconfig";
import style from "../style/edit.module.css";
import { useLanguage } from "../components/LanguageContext";
import {
  ref,
  getDownloadURL,
  uploadBytesResumable,
  deleteObject,
} from "firebase/storage";
import Logo from "../img/logo.svg";

interface Props {
  [x: string]: any;
  imageUrl: string;
  collectionName: string;
  cardId: string;
  firstName: string;
  lastName: string;
  born: string;
  death: string;
  graveId: string;
  sections: {
    title: string;
    description: string;
  }[];
}

const EditButton: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(props.firstName);
  const [newLastName, setNewLastName] = useState(props.lastName);
  const [newBorn, setNewBorn] = useState(props.born);
  const [newDeath, setNewDeath] = useState(props.death);
  const [newGraveId, setNewGraveId] = useState(props.graveId);
  const [sectionIndexToUpdate, setSectionIndexToUpdate] = useState(-1);
  const [newDescription, setNewDescription] = useState(
    props.sections?.[sectionIndexToUpdate]?.description
  );
  const [deleteButtonClicked, setDeleteButtonClicked] = useState(false);
  const [newImage, setNewImage] = useState<File | null>(null);

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  const [updatedSections, setUpdatedSections] = useState(props.sections);

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setNewFirstName(props.firstName);
    setNewLastName(props.lastName);
    setNewBorn(props.born);
    setNewDeath(props.death);
    setNewGraveId(props.graveId);
    setUpdatedSections(props.sections);
  };

  const handleSectionTitleChange = (index: number, value: string) => {
    const updated = updatedSections.map((section, i) => {
      if (i === index) {
        return { ...section, title: value };
      }
      return section;
    });
    setUpdatedSections(updated);

    // set sectionIndexToUpdate to the index of the section being edited
    setSectionIndexToUpdate(index);
  };

  const handleSectionDescriptionChange = (index: number, value: string) => {
    // update the updatedSections state variable
    const updated = updatedSections.map((section, i) => {
      if (i === index) {
        return { ...section, description: value };
      }
      return section;
    });
    setUpdatedSections(updated);

    // update the newDescription state variable for the current section being edited
    if (sectionIndexToUpdate === index) {
      setNewDescription(value);
    } else {
      const newDesc = updated[sectionIndexToUpdate]?.description || "";
      setNewDescription(newDesc);
    }
  };
  const handleSaveClick = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const docRef = doc(db, props.collectionName, props.cardId);

      let newImageUrl = props.imageUrl;
      if (newImage) {
        // Upload the new image file
        const imageRef = ref(storage, "/images/" + newImage.name);
        await uploadBytesResumable(imageRef, newImage);

        // Get the new URL of the image
        newImageUrl = await getDownloadURL(imageRef);
      } else if (props.imageUrl && deleteButtonClicked) {
        // Remove the image from Firebase Storage
        const imageRef = ref(storage, props.imageUrl);
        await deleteObject(imageRef);

        newImageUrl = "";
      }

      const updatedSectionsWithNewDescription = updatedSections.map(
        (section, index) => {
          if (index === sectionIndexToUpdate) {
            return { ...section, description: newDescription };
          }
          return section;
        }
      );

      await updateDoc(docRef, {
        firstName: newFirstName,
        lastName: newLastName,
        born: newBorn,
        death: newDeath,
        graveId: newGraveId,
        imageUrl: newImageUrl,
        sections: updatedSectionsWithNewDescription,
      });

      setIsEditing(false);
    } catch (e) {
      console.error("Error updating card: ", e);
    }
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setNewFirstName(props.firstName);
    setNewLastName(props.lastName);
    setNewBorn(props.born);
    setNewDeath(props.death);
    setNewGraveId(props.graveId);
    setUpdatedSections(props.sections);
    setDeleteButtonClicked(false);
    setNewImage(null);
  };

  const handleDeleteSection = async (
    index: number,
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    const updated = [...updatedSections];
    updated.splice(index, 1);
    setUpdatedSections(updated);

    try {
      const docRef = doc(db, props.collectionName, props.cardId);

      await updateDoc(docRef, {
        sections: updated,
      });

      // Update the sectionIndexToUpdate state variable
      const newSectionCount = updated.length;
      if (sectionIndexToUpdate === index) {
        // If the deleted section was the one being edited, reset sectionIndexToUpdate
        setSectionIndexToUpdate(-1);
      } else if (sectionIndexToUpdate > index) {
        // If the deleted section was before the one being edited, decrement sectionIndexToUpdate
        setSectionIndexToUpdate(sectionIndexToUpdate - 1);
      } else if (sectionIndexToUpdate >= newSectionCount) {
        setSectionIndexToUpdate(newSectionCount - 1);
      }
    } catch (e) {
      console.error("Error deleting section: ", e);
    }
  };

  const handleAddSection = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setUpdatedSections([...updatedSections, { title: "", description: "" }]);
  };

  return (
    <div className={style.editContainer}>
      {isEditing ? (
        <div className={style.Container}>
          <div className={style.boxSize}>
            <button className={style.closeButton} onClick={handleCancelClick}>
              X
            </button>

            <form className={style.editForm} onSubmit={handleSaveClick}>
              <div className={style.topBar}>
                <span className={style.leftSide}>
                  <label htmlFor="firstName">{story.firstName}:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                    required
                  />
                  <label htmlFor="lastName">{story.lastName}:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                    required
                  />
                  <label htmlFor="graveId">{story.graveID}:</label>
                  <input
                    type="text"
                    id="graveId"
                    value={newGraveId}
                    onChange={(e) => setNewGraveId(e.target.value)}
                    required
                  />
                </span>
                <span className={style.rightSide}>
                  <label htmlFor="born">{story.born}:</label>
                  <input
                    type="date"
                    id="born"
                    value={newBorn}
                    onChange={(e) => setNewBorn(e.target.value)}
                    required
                  />
                  <label htmlFor="death">{story.dead}:</label>
                  <input
                    type="date"
                    id="death"
                    value={newDeath}
                    onChange={(e) => setNewDeath(e.target.value)}
                    required
                  />
                </span>
              </div>
              <div className={style.imgcontainer}>
                <label htmlFor="image">Image:</label>
                <img
                  className={style.img}
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : props.imageUrl || Logo
                  }
                  alt={"billede af " + props.firstName}
                />

                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
                />
              </div>

              {updatedSections.map((section, index) => (
                <div key={index} className={style.sectionContainer}>
                  <span className={style.sectionBox}>
                    <div>
                      <button
                        className={style.deleteDtn}
                        onClick={(event) => handleDeleteSection(index, event)}
                      >
                        Delete
                      </button>
                    </div>

                    <input
                      type="text"
                      value={section.title}
                      onChange={(e) =>
                        handleSectionTitleChange(index, e.target.value)
                      }
                      required
                    />
                  </span>
                  <textarea
                    value={section.description}
                    onChange={(e) =>
                      handleSectionDescriptionChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}
              <div className={style.btnBox}>
                <button className={style.sectionBtn} onClick={handleAddSection}>
                  Add Section
                </button>
                <span className={style.btnSpan}>
                  <button
                    onClick={handleCancelClick}
                    className={style.cancelBtn}
                  >
                    Cancel
                  </button>
                  <button className={style.submitBtn} type="submit">
                    {story.section.submit}
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button className={style.editButton} onClick={handleEditClick}>
          {locale.story.editBtn}
        </button>
      )}
    </div>
  );
};
export default EditButton;
