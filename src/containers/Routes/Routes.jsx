import React from "react";
import { Router } from "@reach/router";
import DealsPage from "../DealsPage/DealsPage";
import NotFound from "../NotFound";
import Dashboard from "../Dashboard";
import SignIn from "../../components/SignIn";
import Register from "../../components/Register";
import RestaurantDetails from "../../components/RestaurantDetails";
import FaQs from "../FaQs/FaQs";
import Terms from "../Terms/Terms";
import Logo from "../../components/Logo";
import AccountPage from "../../components/AccountPage";
import RedeemOfferPage from "../../components/RedeemOfferPage";
import PrivateRoutes from "../PrivateRoutes";
import AdminPanel from "../../components/AdminPanel";

const Routes = (props) => {
  const { user, googleSignIn, signIn, signOut } = props;
  return (
    <Router>
      <Dashboard path="/" />
      <Logo path="/" />
      <FaQs path="/faq" />
      <Terms path="/terms-and-conditions" />
      <DealsPage path="/browseDeals" user={user} />
      <SignIn
        path="/sign-in"
        googleSignIn={googleSignIn}
        signIn={signIn}
        signOut={signOut}
        user={user}
      />
      <Register path="/register" signOut={signOut} user={user} />
      <PrivateRoutes path="/" user={user} >
          <AccountPage path="/account" signOut={signOut} user={user}/>
          <RestaurantDetails path="/restaurants/:databaseId" user={user}/>
          <RedeemOfferPage path="/redeem-offer" /> 
      </PrivateRoutes> 
      <AdminPanel path="/adminpanel" user={user}/>
      <NotFound default />
    </Router>
  );
};

export default Routes;
