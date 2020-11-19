import React from "react";
import styles from './FeedbackPanel.module.scss';

const FeedbackPanel = (props) => {
  const {header, text} = props;
  return (
    <section className={styles.feedbackPanel}>
      <h2>{header}</h2>
      <p>{text}</p>
    </section>
  );
};

export default FeedbackPanel;
