import React from "react";
import styles from "./CardList.module.scss";
import DealCard from "../DealCard/DealCard";

const CardList = (props) => {
  const { toggleFav} = props;
  return (
    <>
      <section className={styles.cardlist}>
        {props.restaurants.map((restaurant) => {
          return (
            <DealCard
              key={restaurant.restaurantId}
              restaurant={restaurant}
              toggleFav={toggleFav}
            />
          );
        })}
      </section>
    </>
  );
};

export default CardList;
