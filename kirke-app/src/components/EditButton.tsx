import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/edit.module.css";

interface Props {
  [x: string]: any;
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
        sections: updatedSectionsWithNewDescription,
      });

      setIsEditing(false);
    } catch (e) {
      console.error("Error updating card: ", e);
    }
  };

  return (
    <div className={style.editContainer}>
      <button className={style.editButton} onClick={handleEditClick}>
        Edit
      </button>
      {isEditing && (
        <form className={style.editForm} onSubmit={handleSaveClick}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
          />
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
          />
          <label htmlFor="born">Born:</label>
          <input
            type="date"
            id="born"
            value={newBorn}
            onChange={(e) => setNewBorn(e.target.value)}
          />
          <label htmlFor="death">Death:</label>
          <input
            type="date"
            id="death"
            value={newDeath}
            onChange={(e) => setNewDeath(e.target.value)}
          />
          <label htmlFor="graveId">Grave ID:</label>
          <input
            type="text"
            id="graveId"
            value={newGraveId}
            onChange={(e) => setNewGraveId(e.target.value)}
          />
          {props.sections.map((section, index) => (
            <div key={index}>
              <label htmlFor={`title-${index}`}>Title:</label>
              <input
                type="text"
                id={`title-${index}`}
                value={updatedSections[index].title}
                onChange={(e) =>
                  handleSectionTitleChange(index, e.target.value)
                }
              />
              <label htmlFor={`description-${index}`}>Description:</label>
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
          <button type="submit">Save</button>
        </form>
      )}
    </div>
  );
};
export default EditButton;
