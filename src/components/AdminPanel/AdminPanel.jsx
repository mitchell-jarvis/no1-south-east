import React, { useState, useEffect} from 'react';
import { Link } from '@reach/router'
import styles from './AdminPanel.module.scss';
import 'semantic-ui-css/semantic.min.css'
import { functions } from '../../firebase';
import { firestore } from "../../firebase";
import { navigate, } from "@reach/router";
import logoImage from "../../assets/images/logocut.png";
import AdminSlider from "../utilities/AdminSlider";
import moment from 'moment';


const AdminPanel = ({user}) => {

    const offerTemplate = {
        name: '',
        offerPercent: '',
        offerDescription: '',
        validUntil: '',
        offerAdded: moment(new Date()).format("DD MMM YYYY"),
        image: '',
        discount: {food: false, drink: false},
        happyHour: false,
        daysAvailable: [],
        maximumTableSize: 1,
        dietaryRequirements: {vegetarian: false, vegan: false, halal: false, glutenfree: false, dairyfree: false}, 
        location: [0, 0],
        address: '',
        sitting: {breakfast: false, lunch: false, dinner: false},
        cuisine: [],
        email: '',
        phoneNumber: '',
        instagram: '',          
        website: '',
        restaurantDescription: '',
        termsAndConditions: ''
    };

    const [adminEmail, setAdminEmail] = useState('');
    const [offersList, setOffersList] = useState([]);

    const [newOffer, setNewOffer] = useState(offerTemplate);

    useEffect(() => {
        if (!user || !user.admin){
            navigate("/sign-in");
        } else {
            firestore
                .collection("deals")
                .get()
                .then((querySnapshot) => {
                    const allOffers = [];
                    querySnapshot.forEach((doc) => {
                        const offer = {...doc.data(), offerId: doc.id};
                        allOffers.push(offer)
                    });
                    
                    const offersEpochTime = allOffers.map((offer) => {
                        offer.validUntilEpoch = new Date(offer.validUntil).getTime();
                        return offer;
                    });

                    const latestOffers = offersEpochTime.sort(
                    (offerA, offerB) =>
                        offerA.validUntilEpoch - offerB.validUntilEpoch
                    );
            
                    setOffersList(latestOffers);
                    
                }).catch((err) => console.log(err)); 
        }
    }, []);
    
    const handleEmail = (e) => {
        setAdminEmail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const addAdminRole = functions.httpsCallable('addAdminRole');
        addAdminRole({email: adminEmail}).then(result => {
            console.log(result);
        });
    }
    
    const handleStringInput = (e) => {

        const updateNewOffer = {...newOffer};
        updateNewOffer[`${e.target.name}`] = e.target.value;

        // catch offer percentage for formatting
        if(e.target.name === 'offerPercent' && !e.target.value.includes('%')){
            updateNewOffer[`${e.target.name}`] = `${e.target.value}%`;
        } else if (e.target.name === 'validUntil') {
            updateNewOffer[`${e.target.name}`] = moment(new Date(e.target.value)).format("DD MMM YYYY");
            }

        setNewOffer(updateNewOffer);
    }

    const handleCheckboxInput = (e) => {
        const updateNewOffer = {...newOffer};
        updateNewOffer[`${e.target.name}`][`${e.target.id}`] = e.target.checked;
        setNewOffer(updateNewOffer);
    }

    const handleSliderInput = (value) => {
        const updateNewOffer = {...newOffer};
        updateNewOffer.maximumTableSize = parseInt(value);
        setNewOffer(updateNewOffer);
    }

    const handleArrayInput = (e) => {
        const updateNewOffer = {...newOffer};

        switch (e.target.name){
            case 'cuisine':
                updateNewOffer[`${e.target.name}`] = e.target.value.toLowerCase().replace(/,/g, '').split(' ');
                break;
            case 'location':
                if(e.target.id === 'latitude'){
                    updateNewOffer[`${e.target.name}`][0] = parseFloat(e.target.value);
                } else {
                    updateNewOffer[`${e.target.name}`][1] = parseFloat(e.target.value);
                }
                break;
            case 'daysAvailable':
                    updateNewOffer[`${e.target.name}`] = e.target.value.toLowerCase().replace(/,/g, '').split(' ');
                break;
            default:
                console.log('no value set');
        }
        setNewOffer(updateNewOffer);
    }

    const handleAdd = (e) => {
        e.preventDefault();
        firestore
            .collection("deals").add(newOffer)
            .then(() => {
                setNewOffer(offerTemplate);
                alert('Offer Added!');
            }).catch(error => {
                console.log(error);
            });
        e.target.reset();
    }

    const handleDelete = (e) => {
        firestore
            .collection("deals")
            .doc(e.target.id)
            .delete()
            .catch((err) => console.log(err));

        const updateOffersList = offersList.filter(offer => offer.offerId !== e.target.id)
        setOffersList(updateOffersList);
    };

    const renderOfferList = offersList && offersList.map(offer => {
        return (
            <div className={styles.offer} key={offer.offerId}>
                <span className={styles.offerCode}>{offer.name}</span>
                <span className={styles.offerRestaurant}>{offer.offerDescription}</span>
                <p>{offer.validUntil}</p>
                <button onClick={handleDelete} id={offer.offerId}>Delete</button>
            </div>
        )
    });

    
    if(user && user.admin){
        return( 
            <section className={styles.adminPage}>
                <div className ={styles.logoLink}>
                    <Link to="/browseDeals">
                        <img src={logoImage} alt="logo img" />
                    </Link>         
                </div>
        <h1>Admin Panel</h1>
            <div className="adminContainer">
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="User Email" id="adminEmail" onInput={handleEmail} required />
                    <button type="submit">Make Admin</button>
                </form>
            </div>
        <div className={styles.profileBox}>
            <section className={styles.form}>                
                <div className={styles.form_container}>
                    <form onSubmit={handleAdd}>
                        <section className = {styles.formInput}>
                            <h3>Add an Offer</h3>
                                <input type="text" placeholder="Restaurant Name" name="name" onInput={handleStringInput} required />
                                <textarea placeholder="Offer Description" name="offerDescription" onInput={handleStringInput} required />
                                <textarea placeholder="Restaurant Description" name="restaurantDescription" onInput={handleStringInput} required />
                                <input type="text" placeholder="What type of cuisine does the restaurant serve? (please use lowercase and seperate cuisines with a comma)" name="cuisine" onInput={handleArrayInput} required />
                                <input type="text" placeholder= "Insert restaurant image url here" name="image" onInput={handleStringInput} required />
                                <input type= "text" placeholder="Insert full address of restaurant here (number, street, city, postcode)" name="address" onInput={handleStringInput} required/> 
                        </section>

                    <div className={styles.days}>
                    <p>Which days is the offer available?</p>
                        <input type="text" name="daysAvailable" placeholder="Insert the days of the week the offer is available e.g. monday wednesday sunday" onInput={handleArrayInput}/></div>
                    
                    {/* <label for="maximumTableSize">Maximum Table Size:</label>
                    <div class="slidecontainer"><p>Default range slider:</p>
                <input type="range" min="1" max="100" value="50"></input></div> */}
                
                    <span className={styles.coordinates}>
                        <input type="text" placeholder="Restaurant Latitude" name= "location" id="latitude" onInput={handleArrayInput} required />
                        <input type="text" placeholder="Restaurant Longitude" name= "location" id="longitude" onInput={handleArrayInput} required />
                    </span>

                    <div className={styles.checkboxColumn}>
                        <div className={styles.food}>
                            <p>What's the discount on? </p> 
                            <div className="li checkbox"><input type="checkbox" name="discount" id="food" onInput={handleCheckboxInput} /><label>Food</label></div>
                            <div className="li checkbox"><input type="checkbox" name="discount" id="drink" onInput={handleCheckboxInput}/><label>Drink</label></div>
                        </div>

                    <div className={styles.breakfast}>
                        <p>When is the offer available?</p>
                            <div className="li checkbox"><input type="checkbox" name="sitting" id="breakfast" onInput={handleCheckboxInput}/><label>Breakfast</label></div>
                            <div className="li checkbox"><input type="checkbox" name="sitting" id="lunch" onInput={handleCheckboxInput}/><label>Lunch</label></div>
                            <div className="li checkbox"><input type="checkbox" name="sitting" id="dinner" onInput={handleCheckboxInput}/><label>Dinner</label></div>
                    </div>

                    <div className={styles.diet}>
                        <p>Dietary requirements?</p>
                            <div className="li checkbox"><input type="checkbox" name="dietaryRequirements" id="vegetarian" onInput={handleCheckboxInput}/><label>Vegetarian</label></div>
                            <div className="li checkbox"><input type="checkbox" name="dietaryRequirements" id="vegan" onInput={handleCheckboxInput}/><label>Vegan</label></div>
                            <div className="li checkbox"><input type="checkbox" name="dietaryRequirements" id="halal" onInput={handleCheckboxInput}/><label>Halal</label></div>
                            <div className="li checkbox"><input type="checkbox" name="dietaryRequirements" id="glutenfree" onInput={handleCheckboxInput}/><label>Gluten-Free</label></div>
                            <div className="li checkbox"><input type="checkbox" name="dietaryRequirements" id="dairyfree" onInput={handleCheckboxInput}/><label>Dairy-Free</label></div>
                    </div>
                    </div>   
                    <div className={styles.grid}>
                    <div className={styles.offerPercentage}>
                        <input type="number" placeholder="Offer Percentage" onInput={handleStringInput} name="offerPercent"  required />
                    </div>
                    <div className={styles.phoneNumber}>
                        <input type="number" placeholder="Phone Number" name="phoneNumber" onInput={handleStringInput} required /> 
                    </div>
                    <div className={styles.validUntil}>
                        <label>Date Offer Valid Until</label><input type="date" placeholder= "Date Offer Valid Until" name="validUntil" onInput= {handleStringInput} required />
                    </div>
                    <div className={styles.instagram}>
                        <input type="url" placeholder="Instagram handle" name="instagram" onInput={handleStringInput}  />
                    </div>
                        <input type="email" name="email" placeholder="Email Address" onInput={handleStringInput} required />

                    <div className={styles.website}>
                        <input type="url" placeholder="Website url" name="website" onInput={handleStringInput}  />
                    </div>
                    <div className={styles.slider}>
                        <label for="maximumTableSize">Maximum Table Size:</label>
                        <AdminSlider handleSliderInput={handleSliderInput}/>
                    </div>
                    </div>

                    <button type="submit" className={styles.account_btn} >Add New Restaurant</button>
                    <div className={styles.buttonRow}>
                    </div>
                </form>
                </div>
            </section>
        </div>
        <div className={styles.offerContainer}>
            <h3>Delete an Offer</h3>
            {renderOfferList}
        </div>
        </section>
    )} else {
        return <p>you're not suppose to be here</p>
    }
}

export default AdminPanel;

