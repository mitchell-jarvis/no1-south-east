import React, { useState } from "react";
import styles from "./SideBar.module.scss";
import Calendar from "../../utilities/Calendar";
import ImageIcon from "../../utilities/ImageIcon";
import Slider from "../../utilities/Slider";

import {
  dealTypeIcons,
  mealTimeIcons,
  dietaryIcons,
} from "../../../data/filterIcons";

const SideBar = ({ closeFilterMenu, filterRestaurants }) => {
  const today = new Date();
  const formatToday = today.toISOString().slice(0, 10);

  // create filter parameters array as state
  const [filterParameters, setFilterParameters] = useState({
    discount: { food: false, drink: false },
    dietaryRequirements: {
      vegetarian: false,
      vegan: false,
      halal: false,
      glutenfree: false,
      diaryfree: false,
    },
    sitting: { breakfast: false, lunch: false, dinner: false },
    maximumTableSize: 1,
    validUntil: formatToday,
  });

  // function to collect filter data - this will be passed down into the side bar
  const collectFilters = (filterType, subFilter, value) => {
    // update an array with filter preferences this needs to be passed down to each component
    let filterParametersNew = filterParameters;

    subFilter.length
      ? (filterParametersNew[`${filterType}`][`${subFilter}`] = value)
      : (filterParametersNew[`${filterType}`] = value);

    setFilterParameters(filterParametersNew);
  };

  // fire filtering as filter button has been clicked
  const filtering = () => {
    filterRestaurants(filterParameters);
    closeFilterMenu();
  };

  // map loops for all component rendering - this one is for deal icons
  const renderDealTypeIcons = dealTypeIcons.map((deal) => {
    return (
      <ImageIcon data={deal} collectFilters={collectFilters} key={deal.id} />
    );
  });

  // and this one is for meal type icons (breakfast, lunch, dinner)
  const renderMealTypeIcons = mealTimeIcons.map((meal) => {
    return (
      <div>
        <ImageIcon data={meal} collectFilters={collectFilters} key={meal.id} />
        <p>{meal.text}</p>
      </div>
    );
  });

  // and this one is for dietary type icons (vegan, vegetarian, gluten free etc.)
  const renderDietaryIcons = dietaryIcons.map((diet) => {
    return (
      <ImageIcon data={diet} collectFilters={collectFilters} key={diet.id} />
    );
  });

  // return the lot
  return (
    <div className={styles.filtermenu}>
      <button className={styles.closebtn} onClick={closeFilterMenu}>
        &times;
      </button>
      <div className={styles.whenNeed}>
        <p>When do you want to eat?</p>
        <div className={styles.icons}>
          <Calendar collectFilters={collectFilters} filterType={"validUntil"} />
        </div>
      </div>
      <hr />
      <div className={styles.timeNeed}>
        <p>Breakfast, Lunch or Dinner?</p>
        <div className={styles.icons}>{renderMealTypeIcons}</div>
      </div>
      <hr />
      <div className={styles.dealNeed}>
        <p>Discount on food or drink?</p>
        <div className={styles.icons}>{renderDealTypeIcons}</div>
      </div>
      <hr />
      <div className={styles.dietaryNeed}>
        <p>Any dietary needs?</p>
        <div className={styles.icons}>{renderDietaryIcons}</div>
      </div>
      <Slider collectFilters={collectFilters} filterType={"maximumTableSize"} />
      <div className={styles.icons}>
        <button onClick={filtering}>Filter</button>
      </div>
    </div>
  );
};

export { SideBar as default };
