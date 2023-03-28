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

  const [sortingOption, setSortingOption] = useState<string>("");

  const [sortDirections, setSortDirections] = useState({
    firstName: "asc",
    lastName: "asc",
    born: "asc",
    death: "asc",
    graveId: "asc",
  });

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
    if (sortingOption === "firstName") {
      return [...data].sort((a, b) =>
        sortDirections.firstName === "asc"
          ? a.firstName.localeCompare(b.firstName)
          : b.firstName.localeCompare(a.firstName)
      );
    } else if (sortingOption === "lastName") {
      return [...data].sort((a, b) =>
        sortDirections.lastName === "asc"
          ? a.lastName.localeCompare(b.lastName)
          : b.lastName.localeCompare(a.lastName)
      );
    } else if (sortingOption === "born") {
      return [...data].sort((a, b) =>
        sortDirections.born === "asc"
          ? a.born.localeCompare(b.born)
          : b.born.localeCompare(a.born)
      );
    } else if (sortingOption === "death") {
      return [...data].sort((a, b) =>
        sortDirections.death === "asc"
          ? a.death.localeCompare(b.death)
          : b.death.localeCompare(a.death)
      );
    } else if (sortingOption === "graveId") {
      return [...data].sort((a, b) =>
        sortDirections.graveId === "asc"
          ? parseInt(a.graveId) - parseInt(b.graveId)
          : parseInt(a.graveId) - parseInt(b.graveId)
      );
    } else {
      return data;
    }
  };
  const toggleSortingDirection = (option: string) => {
    setSortingOption(option); // set the sorting option to "firstName"
    setSortDirections((prevDirections: any) => ({
      ...prevDirections,
      [option]: prevDirections[option] === "asc" ? "desc" : "asc",
    }));
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
          <div className={style.selctionBar}>
            <label>story.sortBy</label>

            <div className={style.buttons}>
              <button
                className={sortingOption === "" ? style.active : ""}
                onClick={() => toggleSortingDirection("")}
              >
                story.sortByDefault
              </button>
              <button onClick={() => toggleSortingDirection("firstName")}>
                firstName
                {sortingOption === "firstName" && (
                  <>{sortDirections.firstName === "asc" ? "▼" : "▲"}</>
                )}
              </button>
              <button onClick={() => toggleSortingDirection("lastName")}>
                lastName
                {sortingOption === "lastName" && (
                  <>{sortDirections.lastName === "asc" ? "▼" : "▲"}</>
                )}
              </button>
              <button
                className={sortingOption === "born" ? style.active : ""}
                onClick={() => toggleSortingDirection("born")}
              >
                story.sortByBirthdate
                {sortingOption === "lastName" && (
                  <>{sortDirections.lastName === "asc" ? "▼" : "▲"}</>
                )}
              </button>
              <button
                className={sortingOption === "death" ? style.active : ""}
                onClick={() => toggleSortingDirection("death")}
              >
                story.sortByDeathdate
                {sortingOption === "lastName" && (
                  <>{sortDirections.lastName === "asc" ? "▼" : "▲"}</>
                )}
              </button>
              <button
                className={sortingOption === "graveId" ? style.active : ""}
                onClick={() => toggleSortingDirection("graveId")}
              >
                sortByGraveId
                {sortingOption === "lastName" && (
                  <>{sortDirections.lastName === "asc" ? "▼" : "▲"}</>
                )}
              </button>
            </div>
          </div>
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
