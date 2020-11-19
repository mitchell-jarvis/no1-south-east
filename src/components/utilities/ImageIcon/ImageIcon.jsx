import React, { useState } from 'react';

const ImageIcon = ({data , collectFilters}) => {
    
    const {iconInactive, iconActive, filterType, subFilter} = data;

    const [isToggle, setIsToggle] = useState(false);

    const handleClick = (e) => {
        e.stopPropagation();
        setIsToggle(!isToggle);
        collectFilters(filterType, subFilter, !isToggle);
    }
    
    // require(toggled)
    const toggled = isToggle ? require(`../../../assets/image_icons/${iconActive}`) : require(`../../../assets/image_icons/${iconInactive}`);

    return (
        <span onClick={handleClick}>
            <img src={toggled} alt="not found"/>
        </span>
    )
}

export {ImageIcon as default};