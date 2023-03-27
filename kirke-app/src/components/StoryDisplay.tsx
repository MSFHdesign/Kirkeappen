import React, { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../models/FBconfig";
// components

import style from "../style/display.module.css";
import Skeletor from "./Skeleton";
import Search from "./Search";
import Card from "./StoryCard";
// Costum Hooks
import { useLanguage } from "../components/LanguageContext";

// add sorting compontent

interface Props {
  collectionName: string;
  cardId?: string;
}

const FirebaseCollectionComponent: React.FC<Props> = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [collectionData, setCollectionData] = useState<any[]>([]);
  const [filteredCollectionData, setFilteredCollectionData] = useState<any[]>(
    []
  );

  // sorting
  const [visibleCount, setVisibleCount] = useState(5); // number of visible items
  const [selectValue, setSelectValue] = useState("5");
  const [sortValue] = useState(""); // initial sort value is an empty string
  const [sortDirection] = useState("asc"); // initial sort direction is "newest"

  // Text
  const { locale } = useLanguage();
  const story = locale.story;

  useEffect(() => {
    const subCollectionRef = collection(db, props.collectionName);

    const unsubscribe = onSnapshot(subCollectionRef, (snapshot) => {
      snapshot.docs.sort((a, b) => b.data().createdAt - a.data().createdAt);
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

  useEffect(() => {
    const sortedData = [...collectionData].sort(
      (a, b) => b.timestamp - a.timestamp
    );
    setFilteredCollectionData(sortedData);
  }, [collectionData]);

  const handleCardDelete = (cardId: string) => {
    const updatedCollectionData = collectionData.filter(
      (item) => item.id !== cardId
    );
    setCollectionData(updatedCollectionData);
    setFilteredCollectionData(updatedCollectionData); // update filtered data when item is deleted
  };

  const handleSearch = (searchText: string) => {
    const filteredData = collectionData.filter(
      (item) =>
        item.firstName.toLowerCase().includes(searchText.toLowerCase()) ||
        item.lastName.toLowerCase().includes(searchText.toLowerCase()) ||
        (
          item.firstName.toLowerCase() +
          " " +
          item.lastName.toLowerCase()
        ).includes(searchText.toLowerCase())
    );
    setFilteredCollectionData(filteredData);
  };

  const handleShowMore = () => {
    setVisibleCount((prevCount) => prevCount + parseInt(selectValue, 10));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectValue(e.target.value);
    setVisibleCount(parseInt(e.target.value, 10));
  };
  const sortFunction = (data: any[]) => {
    if (sortValue === "timestamp") {
      return [...data].sort((a, b) =>
        sortDirection === "asc"
          ? a.timestamp - b.timestamp
          : b.timestamp - a.timestamp
      );
    } else {
      return data;
    }
  };

  return (
    <div>
      <div className={style.selectWrapper}>
        <Search data={[]} onSearch={handleSearch} />
        <div className={style.selctionBar}>
          <label># </label>
          <select
            className={style.value}
            value={selectValue}
            onChange={handleSelectChange}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
        </div>
      </div>
      <div className={style.collectionWrapper}>
        {isLoading ? (
          <Skeletor index={3} />
        ) : filteredCollectionData.length === 0 ? (
          <div>{story.error.show}</div>
        ) : (
          <>
            {sortFunction(filteredCollectionData)
              .slice(0, visibleCount)
              .map((item, index) => (
                <div key={index} className={style.cardWrapper}>
                  <Card
                    firstName={item.firstName}
                    lastName={item.lastName}
                    graveNumber={item.graveNumber}
                    born={item.born}
                    death={item.death}
                    imageUrl={item.imageUrl}
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
              ))}

            {filteredCollectionData.length > visibleCount ? (
              <button
                className={style.loadMoreStories}
                onClick={handleShowMore}
              >
                {story.card.showMore.replace("{0}", String(visibleCount))}
              </button>
            ) : (
              <div className={style.loadMoreStories}>{story.card.showEnd}</div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FirebaseCollectionComponent;
