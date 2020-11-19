import React, { useState, useEffect } from "react";
import styles from "./DealsPage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GoogleApiWrapper } from "google-maps-react";
import googleMapsApiKey from "../../data/googleMapsConfig";
import { firestore } from "../../firebase";
import logoImage from "../../assets/images/logocut.png";
import CardList from "../../components/CardList";
import FilterButton from "../../components/filterFunctionality/FilterButton";
import SearchBar from "../../components/filterFunctionality/SearchBar";
import FeedbackPanel from "../../components/filterFunctionality/FeedbackPanel";
import { Link } from "@reach/router";

const DealsPage = (props) => {
  const { user, google } = props;

  // set up states
  // filtered list = search or filter functions, user location = user tracking location, distance sorted list = filtered list if tracking is active.
  const [allRestaurants, setAllRestaurants] = useState();
  const [filteredList, setFilteredList] = useState();
  const [userLocation, setUserLocation] = useState("");
  const [distanceSortedList, setDistanceSortedList] = useState([]);
  const [favourites, setFavourites] = useState([]);

  let restaurants = [];

  const fetchRestaurants = () => {
    firestore
      .collection("deals")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const retaurantData = doc.data();
          restaurants.push({ ...retaurantData, databaseId: doc.id });
        });

        //format offAdded to time since last epoch (use getTime()) property in restaurants array
        const restaurantsEpochTime = restaurants.map((restaurant) => {
          restaurant.offerAdded = new Date(restaurant.offerAdded).getTime();
          return restaurant;
        });

        const latestRestaurants = restaurantsEpochTime.sort(
          (restaurantA, restaurantB) =>
            restaurantA.offerAdded - restaurantB.offerAdded
        );

        setAllRestaurants(latestRestaurants);
        setFilteredList(latestRestaurants);
        if (user) fetchFavourites(latestRestaurants);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRestaurants();
  }, [user]);

  const toggleFav = (restaurant) => {
    if (user) {
      firestore
        .collection("users")
        .doc(user.uid)
        .collection("favourites")
        .get()
        .then((querySnapshot) => {
          const restaurantIds = querySnapshot.docs.map(
            (doc) => doc.data().restaurantId
          );
          if (restaurantIds.includes(restaurant.restaurantId)) {
            removeFromFav(restaurant);
          } else {
            addToFav(restaurant);
          }
        });
    }
  };

  const removeFromFav = (restaurant) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .where("restaurantId", "==", restaurant.restaurantId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.docs[0].ref.delete();
        fetchFavourites(allRestaurants);
      })
      .catch((err) => console.error(err));
  };

  // add to favourites function
  const addToFav = (restaurant) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .add(restaurant)
      .then((res) => res)
      .catch((err) => console.log(err));
  };

  // fetch for the database a list of favourite restaurants
  const fetchFavourites = (restaurants) => {
    firestore
      .collection("users")
      .doc(user.uid)
      .collection("favourites")
      .get()
      .then((querySnapshot) => {
        const restaurantIds = restaurants.map(
          (restaurant) => restaurant.restaurantId
        );
        const favourites = querySnapshot.docs.map((doc) => {
          const favourite = doc.data();
          if (restaurantIds.includes(favourite.restaurantId)) {
            const restaurant =
              restaurants[restaurantIds.indexOf(favourite.restaurantId)];
            restaurant.isFav = true;
          }
          return favourite;
        });
        setFavourites(favourites);
        setAllRestaurants(restaurants);
      })
      .catch((err) => console.error(err));
  };

  // function cycles over all filter properties and filters the restaurants array using only matching values
  const filterRestaurants = (filterParameters) => {
    // just incase it hasn't been reset
    let filteredRestaurants = allRestaurants;

    const filterParameterKeys = Object.keys(filterParameters);

    filterParameterKeys.forEach((parameterKey) => {
      if (typeof filterParameters[`${parameterKey}`] === "object") {
        const subParameterKeys = Object.keys(
          filterParameters[`${parameterKey}`]
        );

        subParameterKeys.forEach((subParameter) => {
          if (filterParameters[`${parameterKey}`][`${subParameter}`]) {
            filteredRestaurants = filteredRestaurants.filter((restaurant) => {
              return (
                restaurant[`${parameterKey}`][`${subParameter}`] ===
                filterParameters[`${parameterKey}`][`${subParameter}`]
              );
            });
          }
        });
      } else if (typeof filterParameters[`${parameterKey}`] === "string") {
        // grab date strings and convert to date objects for comparison and filter.
        const filterDate = new Date(
          filterParameters[`${parameterKey}`]
        ).getTime();

        filteredRestaurants = filteredRestaurants.filter((restaurant) => {
          const restaurantDate = new Date(restaurant.validUntil).getTime();
          return restaurantDate >= filterDate;
        });
      } else {
        // checking that the filterParameters[`${parameterKey}`] has a value less than the restaurants data
        filteredRestaurants = filteredRestaurants.filter(
          (restaurant) =>
            restaurant.maximumTableSize >= filterParameters[`${parameterKey}`]
        );
      }
    });
    // just a catch function to ensure filters or location sorting reverts if user deselects whilst filtering is active.
    if (userLocation) {
      calcDistances(userLocation, filteredRestaurants);
    } else {
      setFilteredList(filteredRestaurants);
    }
  };

  // search filter function
  const searchFilter = (searchValue) => {
    const searchRestaurants = allRestaurants;

    const searchFilteredList = searchRestaurants.filter((restaurant) => {
      const cuisineAndNameArray = restaurant.cuisine.concat([
        restaurant.name.toLowerCase(),
      ]);
      const cuisineAndNameString = cuisineAndNameArray.join(" ");
      return cuisineAndNameString.includes(searchValue.toLowerCase());
    });
    // just a catch function to ensure filters or location sorting reverts if user deselections whilst filtering is active.
    if (userLocation) {
      calcDistances(userLocation, searchFilteredList);
    } else {
      setFilteredList(searchFilteredList);
    }
  };

  // get users location when share location button is clicked.
  const getLocation = () => {
    if (navigator.geolocation) {
      if (!userLocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // grab user location and set state
          const userPosition = new google.maps.LatLng(
            position.coords.latitude,
            position.coords.longitude
          );
          const listToSort = [...filteredList];
          calcDistances(userPosition, listToSort);
        });
      } else {
        // a catch to ensure filters or location sorting reverts if user deselections whilst filtering is active.
        setUserLocation("");
        const latestRestaurants = distanceSortedList.sort(
          (restaurantA, restaurantB) =>
            restaurantA.offerAdded - restaurantB.offerAdded
        );
        setFilteredList(latestRestaurants);
      }
    } else {
      setUserLocation("");
    }
  };

  const calcDistances = (userPosition, listToSort) => {
    // create google coords objects for each restaurant location
    const restaurantLocations = listToSort.map(
      (restaurant) =>
        new google.maps.LatLng(restaurant.location[0], restaurant.location[1])
    );

    // TODO - google API services will only take 25 origins and destinations in a single request, this will need dealing with...
    const service = new google.maps.DistanceMatrixService();

    service.getDistanceMatrix(
      {
        origins: [userPosition],
        destinations: restaurantLocations,
        travelMode: "DRIVING",
      },
      (response, status) => {
        if (status === "OK") {
          // grab response and drill down to data we need i.e. distances to
          const results = response.rows[0].elements;

          // for each restaurant cycle over the returned data and pull out the distance
          for (let i = 0; i < results.length; i++) {
            const element = results[i];

            listToSort[i].distanceTo = element.distance.value;
            listToSort[i].distanceToText = element.distance.text;
          }
          const sortedList = listToSort.sort(
            (restaurantA, restaurantB) =>
              restaurantA.distanceTo - restaurantB.distanceTo
          );

          setUserLocation(userPosition);
          setDistanceSortedList(sortedList);
        }
      }
    );
  };

  const renderLocationBtn = userLocation ? (
    <div className={styles.fa} onClick={() => getLocation()}>
      <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className={styles.fa} />
    </div>
  ) : (
    <div className={styles.faActive} onClick={() => getLocation()}>
      <FontAwesomeIcon
        icon={["fas", "map-marker-alt"]}
        className={styles.faActive}
      />
    </div>
  );
  const renderList = userLocation ? distanceSortedList : filteredList;

  // create and pass the filtered restaurants list to CardList
  const contentJsx = () => {
    if (renderList === undefined) {
      return <p>Deals loading...</p>;
    } else if (renderList.length) {
      return (
        <CardList
          restaurants={renderList}
          toggleFav={toggleFav}
          favourites={favourites}
        />
      );
    } else {
      return (
        <FeedbackPanel
          header="No matches"
          text="None of our restaurants matched that search"
        />
      );
    }
  };

  const isAdmin = user && user.admin ? 
      (<Link to="/adminpanel">
        <button type="submit" className={styles.admin_btn}>Admin Settings</button>
      </Link>)  : null ;
  
      return (
      <div className={styles.container}>
      <div className={styles.searchbar}>
        {isAdmin}
        <Link to="/">
          <img src={logoImage} alt="logo img" />
        </Link>
        <SearchBar
          placeholder="Search by restaurants or cuisine..."
          searchFilter={searchFilter}
        />
      </div>
      <div className={styles.filterOptions}>
        <FilterButton filterRestaurants={filterRestaurants} />
        <span className={styles.profilelink}>
          <Link to="/account">
            <FontAwesomeIcon icon={["fas", "user"]} />
          </Link>
        </span>
        <div className={styles.location}>{renderLocationBtn}</div>
      </div>
      <section className={styles.dealsPage}>
        <h1 className={styles.title}>Latest Offers</h1>
        {contentJsx()}
      </section>
      </div>
      )
}  


export default GoogleApiWrapper({
  apiKey: googleMapsApiKey,
})(DealsPage);
