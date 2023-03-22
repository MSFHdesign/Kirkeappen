import React, { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../models/FBconfig";
import style from "../style/add.module.css";

interface Props {
  collectionName: string;
}

const AddPostComponent: React.FC<Props> = (props) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset error messages
    setTitleError("");
    setContentError("");

    let hasErrors = false;

    // Check if fields are not empty
    if (!title.trim()) {
      setTitleError("Title is required");
      hasErrors = true;
    }
    if (!content.trim()) {
      setContentError("Content is required");
      hasErrors = true;
    }

    // Check if all fields are valid
    if (hasErrors) {
      return;
    }

    try {
      const docRef = await addDoc(collection(db, props.collectionName), {
        title,
        content,
        timestamp: new Date(),
      });

      console.log("Document written with ID: ", docRef.id);

      // Reset the form inputs
      setTitle("");
      setContent("");
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  return (
    <div className={style.addPostContainer}>
      <h2>Add a new post</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={style.addPostInput}
          />
        </label>
        {titleError && <p>{titleError}</p>}
        <label>
          Content:
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={style.addPostTextArea}
          />
        </label>
        {contentError && <p>{contentError}</p>}
        <button type="submit" className={style.addPostButton}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddPostComponent;
