const functions = require('firebase-functions');
// add admin SDK
const admin = require('firebase-admin');
admin.initializeApp();

// here we need to create a function to export to the cloud? It uses https request and onCall meaning we can call it from the front end and ping it to the backend cloud
// the onCall method takes in a call back function so that we the function is called on the front end this callback is fired.
exports.addAdminRole = functions.https.onCall((data, context) => {
    // small catch to check if the user making this request is actually an admin
    if(context.auth.token.admin !== true){
        return {error: 'ah ah ah what\'s the magic word...'}
    }
    // get user and add custom claim (admin) - 
    //to get user we will need to pass the eamil of the user when this function is invoked on the frontend so it should be
    // accessible from the data property i.e. data.email
    // we need to return something as this is a promise here we are accessing the auth() method on the firebase-admin and fetching a user based on the email we pass.
    return admin.auth().getUserByEmail(data.email).then(user => {
        // user here is the user the above methods have retrieved from firebase
        // next we want to add a custom claim to the returned user, we use the method setCustomUserClaims(user, claims)
        // The claims here is an object were we can add our claims i.e. admin: true to make someone an admin.
        return admin.auth().setCustomUserClaims(user.uid, {
            admin: true
        });
    }).then(() => {
        // success!
        return {
            message: `Success! ${data.email} has been made an admin.`
        }
    }).catch(error => {
        return error;
    });
});

