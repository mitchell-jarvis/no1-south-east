import React from 'react';
import { Link } from '@reach/router';
import image from "../../assets/images/Homepagelogo.png"
import styles from './Logo.module.scss';

const Logo = () => {

    return (
        <div className={styles.logoContainer}>
            <Link to="/">
                <img src={image} alt="logo" />
            </Link>
        </div>
    )
}

export default Logo;