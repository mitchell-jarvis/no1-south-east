import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./ManageAccountButton.module.scss";
import { Link } from "@reach/router";

const ManageAccountButton = () => {
    return (
        <Link to="/account">
        <span className={styles.profilelink}>
        <FontAwesomeIcon icon={["fas", "user"]} />
        </span>
        </Link>
    )
}
export default ManageAccountButton;