import React, { useState, useEffect } from "react";
import styles from "./RestaurantDetails.module.scss";
import { Link } from "@reach/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Logo from "../Logo/Logo";
import ManageAccountButton from "../../components/ManageAccountButton";

import { firestore } from "../../firebase";
import GenerateCode from "../GenerateCode/GenerateCode";

const RestaurantDetails = (props) => {
  const [restaurantData, setrestaurantData] = useState();
  const [isClicked, setIsClicked] = useState(false);

  //*****importing data from firestore*****//

  const fetchRestaurants = () => {
    firestore
      .collection("deals")
      .doc(props.databaseId)
      .get()
      .then((doc) => {
        const data = doc.data();
        data.uid = doc.id;
        setrestaurantData(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRestaurants();
  }, []);

  // function for each diary requirement image - can be improved
  const ConvertBooleanToText = (inputBooleanArray) => {
    const outputString = Object.keys(inputBooleanArray)
      .filter((x) => inputBooleanArray[x])
      .join(", ");
    return outputString;
  };

  const handleClick = () => {
    setIsClicked(!isClicked);
  };

  const redeemOfferButton =
    props.user !== null ? (
      <button onClick={handleClick}>Get Code</button>
    ) : (
      <Link to="/SignUp">
        <button>Get Code</button>
      </Link>
    );
  const offerCodeModal = isClicked ? (
    <GenerateCode
      handleClick={handleClick}
      user={props.user}
      restaurantData={restaurantData}
    />
  ) : null;

  if (restaurantData) {
    const {
      name,
      image,
      cuisine,
      validUntil,
      daysAvailable,
      maximumTableSize,
      dietaryRequirements,
      sitting,
      phoneNumber,
      email,
      instagram,
      website,
      offerDescription,
      restaurantDescription,
      address,
    } = restaurantData;
    return (
      <>
        <Logo />
        <div className={styles.accountLink}>
          <ManageAccountButton className={styles.profileButton} />
        </div>
        <div className={styles.RestaurantDetails}>
          <h1>{name}</h1>
          <img className={styles.responsiveImage} src={image} alt={name} />
          <div className={styles.restaurantDescription}>
            <div className={styles.paragraph}>
              <h4>Location: </h4>
              <p>{address}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Offer Details: </h4>
              <p>{offerDescription}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Restaurant Info: </h4>
              <p>{restaurantDescription}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Cuisine: </h4>
              <p>{cuisine.join(", ")}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Sitting: </h4>
              <p>{ConvertBooleanToText(sitting)}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Valid until: </h4>
              <p>{validUntil}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Days Available: </h4>
              <p>{daysAvailable.join(", ")}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Maximum Table Size: </h4>
              <p>{maximumTableSize}</p>
            </div>
            <div className={styles.paragraph}>
              <h4>Dietary requirements: </h4>
              <p>{ConvertBooleanToText(dietaryRequirements)}</p>
            </div>
          </div>
          <span className={styles.fontawesomeContainer}>
            <a href={instagram} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fab", "instagram"]} />
            </a>
            <a href={website} target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={["fa", "globe"]} />
            </a>
            <a
              href={`tel: ${phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fas", "phone-alt"]} />
            </a>
            <a
              href={`mailto: ${email}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={["fas", "envelope"]} />
            </a>
          </span>
          {redeemOfferButton}
        </div>
        {offerCodeModal}
      </>
    );
  } else {
    return <p>Loading....</p>;
  }
};

export default RestaurantDetails;
