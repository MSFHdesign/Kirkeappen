import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../models/FBconfig";
import EditButton from "./EditButton";
import DeleteButton from "./DeleteButton";
import style from "../style/display.module.css";
import { useLanguage } from "../components/LanguageContext";
import Skeletor from "./Skeleton";

interface Props {
  collectionName: string;
  cardId?: string;
}
interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState<any[]>([]);

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

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
      setIsLoading(false); // set isLoading to false when data is fetched
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
      {isLoading ? (
        // Skeleton Placeholder
        <>
          <Skeletor />
          <Skeletor />
          <Skeletor />
          <Skeletor />
        </>
      ) : (
        // Actual Content
        filteredCollectionData.map((item, index) => (
          <div key={index} className={style.cardWrapper}>
            <div className={style.cardImg} />
            <div className={style.contentWrapper}>
              <div className={style.textBox}>
                <div className={style.topBoxes}>
                  <span className={style.nameBox}>
                    <h2>
                      {item.firstName}&nbsp;
                      {item.lastName}
                    </h2>
                    <p>
                      {story.graveID} {item.graveNumber}
                    </p>
                  </span>
                  <span className={style.dates}>
                    <h3>
                      {story.born}: {item.born}
                    </h3>
                    <h3>
                      {story.dead}: {item.death}
                    </h3>
                  </span>
                </div>
                <div>
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
                </div>
              </div>
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
                  graveId={item.graveNumber}
                  sections={item.sections}
                />
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default FirebaseCollectionComponent;
