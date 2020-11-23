import React, { useState, useEffect } from "react";
import styles from "./AccountPage.module.scss";
import Logo from "../Logo/Logo";
import favourites from "../../data/restaurants";
import CardList from "../CardList";
import FeedbackPanel from "../filterFunctionality/FeedbackPanel";
import { firestore } from "../../firebase";
import moment from "moment";
import { Link } from "@reach/router";
const AccountPage = ({ signOut, user }) => {
  //take the favourites and render them in the pages below using this operator
  const renderCards = favourites.length ? (
    //cut down the favs and only take 5
    <CardList
      className={styles.cardList}
      restaurants={favourites.slice(0, 5)}
    />
  ) : (
    <FeedbackPanel header="No favourites" />
  );
  // we have used a placeholder for the FAVs, Saved and redeemed
  // save offer code in saved offers on profile page.
  // on profile page check the db for any offers that contain the user uid and return.
  const [offerCodes, setOfferCodes] = useState([]);
  // useEffect(() => {
  //   if (user !== null) {
  //     firestore
  //       .collection("offerCodes")
  //       .get()
  //       .then((querySnapshot) => {
  //         const allOffers = [];
  //         querySnapshot.forEach((doc) => {
  //           const offers = { ...doc.data(), codeid: doc.id };
  //           allOffers.push(offers);
  //         });
    useEffect(() => {
        if (user !== null) {
            firestore
        .collection("offerCodes")
        .get()
        .then((querySnapshot) => {
            const allOffers = [];
            querySnapshot.forEach((doc) => {
                const offers = { ...doc.data(), codeid: doc.id };
                allOffers.push(offers)
            });
            setOfferCodes(allOffers.filter(code => code.userid === user.uid).sort((offerA, offerB) => offerB.createdAt.seconds - offerA.createdAt.seconds));
        }).catch((err) => console.log(err));
        }
    }, [user])
    // const offerJsx = offerCodes.length ? (
    //     offerCodes.map(offer => {
    //         return (
    //             <div className={styles.offer}>
    //                 <span className={styles.offerCode}>{offer.codeid}</span>
    //                 <span className={styles.offerRestaurant}>{offer.restaurantName}</span>
    //                 <p>{moment(offer.createdAt.toDate()).calendar()}</p>
    //             </div>
    //         )
    //     })               
    // ) : 
    // (<p>You have no redeemed offers</p>)
  const offerJsx = offerCodes.length ? (
    offerCodes.map((offer) => {
      return (
        <div className={styles.offer}>
          <span className={styles.offerCode}>{offer.codeid}</span>
          <span className={styles.offerRestaurant}>{offer.restaurantName}</span>
          <p>{moment(offer.createdAt.toDate()).calendar()}</p>
        </div>
      );
    })
  ) : (
    <p>You have no redeemed offers</p>
  );
  return (
    <div className={styles.account}>
      <div className={styles.page}>
        <div name="profile"></div>
        <Logo />
        <div className={styles.profileBox}>
          <section className={styles.form}>
            <h3>Update your info</h3>
            <form action="">
              <div className={styles.form_container}>
                <input type="text" placeholder="First Name" required />
                <input type="text" placeholder="Last Name" required />
              </div>
              <div className={styles.form_container}>
                <input
                  type="text"
                  name="email"
                  placeholder="Email Address"
                  required
                />
                <input
                  type="text"
                  name="password"
                  placeholder="Password"
                  required
                />
                <input
                  type="text"
                  name="confirmpassword"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              <button type="submit" className={styles.account_btn}>
                Update
              </button>
              <button onClick={signOut} className={styles.account_btn}>
                Sign out
              </button>
            </form>
          </section>
        </div>
        <div className={styles.navButtons}>
          <div className={styles.buttons}>
            <a href="#profile">
              <button className={styles.navButton}>Profile</button>
            </a>
            {/* <a href="#favourites">
                            <button className={styles.navButton}>Favourites</button>
                        </a>
                        <a href="#recentlyViewed">
                            <button className={styles.navButton} >Recently Viewed</button>
                        </a> */}
            <a href="#redeemed">
              <button className={styles.navButton}>Redeemed Offers</button>
            </a>
            <a href="#referFriend">
              <button>Refer a Friend</button>
            </a>
            <Link to="/browseDeals">
              <button>Back to Offers</button>
            </Link>
          </div>
        </div>
      </div>
      {/* This code below can be used to add in the users favourites on firebase */}
      {/* <a name="favourites"></a>
            <h2 className={styles.boxtitle}>Favourites</h2>
            <div className={styles.wrapper}>
                <div className={styles.cardRender}>
                    {renderCards}
                </div>
            </div> */}
      {/* This code below can be used to add in the users recently viewed offers on firebase */}
      {/* <a name="recentlyViewed"></a>
            <h2 className={styles.boxtitle}> Recently Viewed</h2>
            <div className={styles.wrapper}>
                <div className={styles.cardRender}>
                    {renderCards}
                </div>
            </div> */}
      <div name="redeemed"></div>
      <h2 className={styles.boxtitle}> Redeemed Offers</h2>
      <div className={styles.wrapperRedeemed}>
        <div className={styles.cardRenderRedeemed}>
          <section className={styles.offerForm}>{offerJsx}</section>
        </div>
      </div>
      <div className={styles.page}>
        <div name="referFriend"></div>
        <h2 className={styles.boxtitle}>Refer a Friend</h2>
        <section className={styles.form}>
          <div className={styles.refer}>
            <button className={styles.refer_btn}>
              Click for a referral code:
            </button>
          </div>
        </section>
      </div>
    </div>
  )};
export default AccountPage;