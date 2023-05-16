import React, { useState } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, storage } from "../models/FBconfig";
import style from "../style/edit.module.css";
import { useLanguage } from "../components/LanguageContext";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
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
  comments: {
    title: string;
    comment: string;
  }[];
}

const EditButton: React.FC<Props> = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newFirstName, setNewFirstName] = useState(props.firstName);
  const [newLastName, setNewLastName] = useState(props.lastName);
  const [newBorn, setNewBorn] = useState(props.born);
  const [newDeath, setNewDeath] = useState(props.death);
  const [newGraveId, setNewGraveId] = useState(props.graveId);
  const [newImage, setNewImage] = useState<File | null>(null);

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  const [updatedSections, setUpdatedSections] = useState(props.sections);
  const [updatedComments, setUpdatedComments] = useState(props.comments);

  const handleEditClick = () => {
    setIsEditing((prevIsEditing) => !prevIsEditing);
    setNewFirstName(props.firstName);
    setNewLastName(props.lastName);
    setNewBorn(props.born);
    setNewDeath(props.death);
    setNewGraveId(props.graveId);
    setUpdatedSections(props.sections);
    setUpdatedComments(props.comments);
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

      await updateDoc(docRef, {
        firstName: newFirstName,
        lastName: newLastName,
        born: newBorn,
        death: newDeath,
        graveId: newGraveId,
        imageUrl: newImageUrl,
        sections: updatedSections,
        comments: updatedComments,
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
    setNewImage(null);
  };

  const handleDeleteSection = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const updated = [...updatedSections];
    updated.splice(index, 1);
    setUpdatedSections(updated);
  };

  const handleAddSection = () => {
    setUpdatedSections([...updatedSections, { title: "", description: "" }]);
  };

  const handleSectionTitleChange = (index: number, value: string): void => {
    const updated = [...updatedSections];
    updated[index].title = value;
    setUpdatedSections(updated);
  };
  const handleSectionDescriptionChange = (
    index: number,
    value: string
  ): void => {
    const updated = [...updatedSections];
    updated[index].description = value;
    setUpdatedSections(updated);
  };

  const handleDeleteComment = (
    event: React.MouseEvent<HTMLButtonElement>,
    index: number
  ) => {
    event.preventDefault();
    const updated = [...updatedComments];
    updated.splice(index, 1);
    setUpdatedComments(updated);
  };

  const handleAddComment = () => {
    setUpdatedComments([...updatedComments, { title: "", comment: "" }]);
  };
  const handleCommentTitleChange = (index: number, value: string): void => {
    const updated = [...updatedComments];
    updated[index] = { ...updated[index], title: value };
    setUpdatedComments([...updated]);
  };

  const handleCommentDescriptionChange = (
    index: number,
    value: string
  ): void => {
    const updated = [...updatedComments];
    updated[index] = { ...updated[index], comment: value };
    setUpdatedComments([...updated]);
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
                <label htmlFor="image">{story.img}:</label>
                <img
                  className={style.img}
                  src={
                    newImage
                      ? URL.createObjectURL(newImage)
                      : props.imageUrl || Logo
                  }
                  alt={"billede af " + props.firstName + props.lastName}
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
                        onClick={(e) => handleDeleteSection(e, index)}
                      >
                        {story.delete}
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

              <button className={style.sectionBtn} onClick={handleAddSection}>
                {story.section.addSection}
              </button>

              {updatedComments.map((comments, index) => (
                <div key={index} className={style.commentContainer}>
                  <span className={style.sectionBox}>
                    <div>
                      <button
                        className={style.deleteDtn}
                        onClick={(e) => handleDeleteComment(e, index)}
                      >
                        {story.delete}
                      </button>
                    </div>

                    <input
                      type="text"
                      value={comments.title}
                      onChange={(e) =>
                        handleCommentTitleChange(index, e.target.value)
                      }
                      required
                    />
                  </span>
                  <textarea
                    value={comments.comment}
                    onChange={(e) =>
                      handleCommentDescriptionChange(index, e.target.value)
                    }
                    required
                  />
                </div>
              ))}

              <div className={style.btnBox}>
                <button className={style.commentBtn} onClick={handleAddComment}>
                  <p> Tilføj</p>
                </button>

                <span className={style.btnSpan}>
                  <button
                    onClick={handleCancelClick}
                    className={style.cancelBtn}
                  >
                    {story.section.cancel}
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
