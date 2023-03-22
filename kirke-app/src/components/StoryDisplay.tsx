import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../models/FBconfig";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";

interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [collectionData, setCollectionData] = useState<any[]>([]);

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
    : collectionData;

  const handleCardDelete = (cardId: string) => {
    const updatedCollectionData = collectionData.filter(
      (item) => item.id !== cardId
    );
    setCollectionData(updatedCollectionData);
  };

  return (
    <div>
      {filteredCollectionData.map((item, index) => (
        <div key={index}>
          <h2>{item.title}</h2>
          <p>{item.content}</p>
          <div>
            <EditButton
              collectionName={props.collectionName}
              cardId={item.id}
              title={item.title}
              content={item.content}
            />
            <DeleteButton
              collectionName={props.collectionName}
              cardId={item.id}
              onDelete={() => handleCardDelete(item.id)}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default FirebaseCollectionComponent;
