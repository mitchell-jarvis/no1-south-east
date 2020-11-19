﻿import React, { useState } from "react";
import styles from "./SearchBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { placeholder, searchFilter } = props;

  const input = isOpen ? <input type="text" placeholder={placeholder} onInput={e => searchFilter(e.target.value)} /> : null;

  return (
    <div className={styles.search}>
      {input}
      <span className={styles.fa} onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon="search" />
      </span>
    </div>
  );
};

export default SearchBar;