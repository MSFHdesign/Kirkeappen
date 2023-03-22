import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../models/FBconfig";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import style from "../style/display.module.css";
interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  useEffect(() => {
    const subCollectionRef = collection(db, props.collectionName);

    const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
      const data = snapshot.docs.map((doc) => {
        return {
          ...doc.data(),
          id: doc.id,
        };
      });
      setCollectionData(data);
    });

    return () => unsubscribe();
  }, [props.collectionName]);

  const filteredCollectionData = props.cardId
    ? collectionData.filter((item) => item.id === props.cardId)
    : collectionData.map((item) => ({
        ...item,
        sections: item.sections || [],
      }));

  const handleCardDelete = (cardId: string) => {
    const updatedCollectionData = collectionData.filter(
      (item) => item.id !== cardId
    );
    setCollectionData(updatedCollectionData);
  };

  return (
    <div className={style.collectionWrapper}>
      {filteredCollectionData.map((item, index) => (
        <div key={index} className={style.cardWrapper}>
          {editingCardId !== item.id && (
            <>
              <h2>
                {item.firstName} {item.lastName}
              </h2>

              <h3>Født: {item.born}</h3>
              <h3>Død: {item.death}</h3>
              <h3>Grav nummer {item.graveNumber}</h3>
              {item.sections.map(
                (
                  section: { title: string; description: string },
                  sectionIndex: React.Key
                ) => (
                  <div key={sectionIndex} className={style.section}>
                    <h3>{section.title}</h3>
                    <p>{section.description}</p>
                  </div>
                )
              )}
              {/* item.born */}

              <div className={style.buttonsWrapper}>
                <DeleteButton
                  collectionName={props.collectionName}
                  cardId={item.id}
                  onDelete={() => handleCardDelete(item.id)}
                />
                <EditButton
                  collectionName={props.collectionName}
                  cardId={item.id}
                  firstName={item.firstName}
                  lastName={item.lastName}
                  born={item.born}
                  death={item.death}
                  graveId={item.GraveId}
                  sections={item.sections}
                />
              </div>
            </>
          )}
          {editingCardId === item.id && (
            <EditButton
              collectionName={props.collectionName}
              cardId={item.id}
              firstName={item.firstName}
              lastName={item.lastName}
              born={item.born}
              death={item.death}
              graveId={item.GraveId}
              sections={item.sections}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default FirebaseCollectionComponent;
