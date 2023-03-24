import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../models/FBconfig";

import style from "../style/display.module.css";
import { useLanguage } from "../components/LanguageContext";
import Skeletor from "./Skeleton";
import Search from "./Search";
import Card from "./StoryCard";

interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [filteredCollectionData, setFilteredCollectionData] = useState<any[]>([]);
  const [limit, setLimit] = useState(10); // default limit is 10

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
      setFilteredCollectionData(data); // set filtered data to initial data
      setIsLoading(false); // set isLoading to false when data is fetched
    });

    return () => unsubscribe();
  }, [props.collectionName]);

  const handleCardDelete = (cardId: string) => {
    const updatedCollectionData = collectionData.filter((item) => item.id !== cardId);
    setCollectionData(updatedCollectionData);
    setFilteredCollectionData(updatedCollectionData); // update filtered data when item is deleted
  };

  const handleSearch = (searchText: string) => {
    const filteredData = collectionData.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredCollectionData(filteredData.slice(0, limit)); // apply limit to filtered data
  };

  const handleShowMore = () => {
    setLimit(limit + limit); // increase the limit by the selected value
    setFilteredCollectionData(collectionData.slice(0, limit + limit)); // apply the new limit to filtered data
  };

  return (
    <div className={style.collectionWrapper}>
      <Search data={[]} onSearch={handleSearch} />
      {isLoading ? (
        <>
          <Skeletor index={3} />
        </>
      ) : filteredCollectionData.length === 0 ? (
        <div>{story.error.show}</div>
      ) : (
        filteredCollectionData.map((item, index) => (
          <div key={index} className={style.cardWrapper}>
            <Card
              firstName={item.firstName}
              lastName={item.lastName}
              graveNumber={item.graveNumber}
              born={item.born}
              death={item.death}
              sections={item.sections.map(
                (section: { title: string; description: string }) => ({
                  title: section.title,
                  description: section.description,
                })
              )}
              collectionName={props.collectionName}
              cardId={item.id}
              onDelete={() => handleCardDelete(item.id)}
            />
          </div>
        ))
      )}
    </div>
  );
};

export default FirebaseCollectionComponent;
