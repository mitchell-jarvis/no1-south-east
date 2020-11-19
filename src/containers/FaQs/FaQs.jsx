import React from "react";
import styles from "./FaQs.module.scss";
import footerLogo from "../../assets/images/footerLogo.png";
import Logo from "../../components/Logo";
import Footer from "../../components/Footer";
import { Link } from "@reach/router";

const FaQs = () => {
  return (
    <section className={styles.page}>
      <Logo />
      <div className={styles.faqs}>
        <div className={styles.faqscontainer}>
          <h3>FAQ's</h3>
          <span>
            <p>How do I sign up?</p>
            <p>
              Head to this <Link to="/register">link</Link> and register for
              your first 2 months free!
            </p>
          </span>
          <span>
            <p>How much is the membership?</p>
            <p>Only £4.99 per month</p>
          </span>
          <span>
            <p>Where are your offers located?</p>
            <p>
              Currently we have offerings across the South East of London in
              areas such as Beckenham, Bromley, Greenwich, Orpington, Petts
              Wood, Locksbottom and Sevenoaks. New restaurants are continually
              being added to keep your eyes peeled for new additions.
            </p>
          </span>
          <span>
            <p>Will you be expanding to other locations?</p>
            <p>Yes, work is currently underway to launch No.1 in other areas</p>
          </span>
          <span>
            <p>Can I cancel my membership?</p>
            <p>Yes, you can cancel your membership at any point by……</p>
          </span>
          <span>
            <p>
              I went to a restaurant but they refused to accept my offer. What
              do I do?
            </p>
            <p>
              Thanks for getting in touch. Please contact us by email here so we
              can investigate this.
            </p>
          </span>
          <span>
            <p>How do I contact you?</p>
            <p>You can email us at info@no1southeast.co.uk</p>
          </span>
          <span>
            <p>What times and days can I use the offers?</p>
            <p>
              Each offer is individual and the finer details are outlined within
              each offering
            </p>
          </span>
          <img src={footerLogo} alt="footer logo" />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default FaQs;
