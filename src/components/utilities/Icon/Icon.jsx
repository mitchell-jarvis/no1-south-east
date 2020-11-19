import React, { useState } from 'react';
import styles from './Icon.module.scss';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Icon = ({data, collectFilters}) => {

    const {icon, filterType, subFilter} = data;

    const [isToggle, setIsToggle] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsToggle(!isToggle);
        collectFilters(filterType, subFilter, !isToggle);
    }

    const toggled = isToggle ? styles.toggle : null;

    return (
        <span className={toggled} onClick={handleClick}>
            <FontAwesomeIcon icon={icon} />
        </span>
    )
}

export {Icon as default};