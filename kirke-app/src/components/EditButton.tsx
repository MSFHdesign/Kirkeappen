import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../models/FBconfig";
import style from "../style/edit.module.css";
import { useLanguage } from "../components/LanguageContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";

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
    props.sections[sectionIndexToUpdate]?.description
  );
  const [newImage, setNewImage] = useState<File | null>(null);

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  const [updatedSections, setUpdatedSections] = useState(props.sections);

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
  };
  const handleSectionTitleChange = (index: number, value: string) => {
    const updated = updatedSections.map((section, i) => {
      if (i === index) {
        return { ...section, title: value };
      }
      return section;
    });
    setUpdatedSections(updated);
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

  return (
    <div className={style.editContainer}>
      {isEditing ? (
        <div className={style.Container}>
          <div className={style.boxSize}>
            <form className={style.editForm} onSubmit={handleSaveClick}>
              <div className={style.topBar}>
                <span className={style.leftSide}>
                  <label htmlFor="firstName">{story.firstName}:</label>
                  <input
                    type="text"
                    id="firstName"
                    value={newFirstName}
                    onChange={(e) => setNewFirstName(e.target.value)}
                  />
                  <label htmlFor="lastName">{story.lastName}:</label>
                  <input
                    type="text"
                    id="lastName"
                    value={newLastName}
                    onChange={(e) => setNewLastName(e.target.value)}
                  />
                  <label htmlFor="graveId">{story.graveID}:</label>
                  <input
                    type="text"
                    id="graveId"
                    value={newGraveId}
                    onChange={(e) => setNewGraveId(e.target.value)}
                  />
                </span>
                <span className={style.rightSide}>
                  <label htmlFor="born">{story.born}:</label>
                  <input
                    type="date"
                    id="born"
                    value={newBorn}
                    onChange={(e) => setNewBorn(e.target.value)}
                  />
                  <label htmlFor="death">{story.dead}:</label>
                  <input
                    type="date"
                    id="death"
                    value={newDeath}
                    onChange={(e) => setNewDeath(e.target.value)}
                  />
                </span>
                <label htmlFor="image">Image:</label>
                <input
                  type="file"
                  id="image"
                  accept="image/*"
                  onChange={(e) => setNewImage(e.target.files?.[0] ?? null)}
                />
              </div>
              {props.sections.map((section, index) => (
                <div key={index} className={style.sectionBox}>
                  <label htmlFor={`title-${index}`}>
                    {story.section.title}:
                  </label>
                  <input
                    id={`title-${index}`}
                    value={updatedSections[index].title}
                    onChange={(e) =>
                      handleSectionTitleChange(index, e.target.value)
                    }
                  />
                  <label htmlFor={`description-${index}`}>
                    {story.section.description}:
                  </label>
                  <textarea
                    id={`description-${index}`}
                    value={updatedSections[index].description}
                    onFocus={() => setSectionIndexToUpdate(index)}
                    onBlur={() => {
                      setSectionIndexToUpdate(-1);
                    }}
                    onChange={(e) =>
                      handleSectionDescriptionChange(index, e.target.value)
                    }
                  />
                </div>
              ))}
              <button className={style.editButton} type="submit">
                {story.section.submit}
              </button>
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
