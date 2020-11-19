const getApiKey = () => {
    if (process.env.FIREBASE_CONFIG) {
        const firebaseConfig = JSON.parse(process.env.FIREBASE_CONFIG);
        return firebaseConfig.googlemaps.key;
    } else if (process.env.REACT_APP_GOOGLE_API_KEY) {
        return process.env.REACT_APP_GOOGLE_API_KEY;
    } 
    // else {
    //     throw new Error("Cannot find Google Maps API key");
    // }
}

const apiKey = getApiKey();

export default apiKey;



