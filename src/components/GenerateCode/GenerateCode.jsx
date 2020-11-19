import React, { useState, useEffect } from 'react';
import styles from './GenerateCode.module.scss';
import { Link } from "@reach/router";
import moment from 'moment';

import { firestore } from '../../firebase';

const GenerateCode = ({handleClick, user, restaurantData}) => {

    const [offerDetails, setDetailsCode] = useState({});

    // save offer code in saved offers on profile page.
    // on profile page check the db for any offers that contain the user uid and return.
    // check if offer for this restaurant has already been created/exists if true show that rather than creating another.
    useEffect(() => {

        let matchingOffer = [];

        firestore
        .collection("offerCodes")
        .get()
        .then((querySnapshot) => {
            const allOffers = []
            querySnapshot.forEach((doc) => {
                const offers = {...doc.data(), codeid: doc.id};
                allOffers.push(offers)
            })
            matchingOffer = allOffers.filter(code => {
                return code.userid === user.uid && code.restaurantid === restaurantData.uid;
            });
        }).then(() => {
            if(matchingOffer.length){
                setDetailsCode({
                    codeid: matchingOffer[0].codeid,
                    restaurantName: matchingOffer[0].restaurantName,
                    createdAt:  matchingOffer[0].createdAt.toDate()
                });  
            } else {
                firestore
            .collection("offerCodes")
            .add({
                userid: user.uid,
                restaurantid: restaurantData.uid,
                restaurantName: restaurantData.name,
                createdAt: new Date()
            })
            .then((doc) => { 
                setDetailsCode({
                    codeid: doc.id,
                    restaurantName: restaurantData.name,
                    createdAt: new Date()
                });       
            }).catch((err) => console.log(err));
            }
        }).catch((err) => console.log(err));
    }, []);

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={handleClick}>&times;</span>
                <h3>Nice one!</h3>
                <h5>Here's your code...</h5>
                <p className={styles.code}>{offerDetails.codeid}</p>
                <p className={styles.codeRestaurant}>{offerDetails.restaurantName}</p>
                <p>{moment(offerDetails.createdAt).calendar()}</p>
                <p>This offer has now been saved to your <Link to="/account" >profile</Link></p>
            </div>
        </div>
    )
}

export default GenerateCode;
