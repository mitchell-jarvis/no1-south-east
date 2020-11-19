import React, { useState } from 'react';
import styles from './FilterButton.module.scss';
import SideBar from '../SideBar';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FilterButton = ({filterRestaurants}) => {

    // assign filter menu open state, default closed
    const [isOpen, setIsOpen] = useState(false);

    // create function to pass down to filter menu so that it can close itself
    const closeFilterMenu = () => {
        setIsOpen(!isOpen);
    }

    // ternary for checking if the filter bar should be shown or not
    const filterMenu = isOpen ? <SideBar closeFilterMenu={closeFilterMenu} filterRestaurants={filterRestaurants} /> : null;

    return (
        <div className={styles.filter}>
            <button onClick={() => setIsOpen(!isOpen)}><FontAwesomeIcon icon={['fas', 'filter']} /></button>

            <div className={styles.filtermenu}>
                {filterMenu}
            </div>
        </div>
    )
}

export {FilterButton as default};