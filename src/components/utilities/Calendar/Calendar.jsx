import React from 'react'
import styles from './Calendar.module.scss';

const Calendar = ({collectFilters, filterType}) => {

    const today = new Date();
    const formatToday = today.toISOString().slice(0,10);

    const handleChange = (e) => {
        collectFilters(filterType, "", e.target.value)
    }

    return (
        <form id="chooseEatDate" className={styles.CalendarContainer}>
            <input type="date" name="diningDate" min={formatToday} className={styles.Calendar} onChange={handleChange}/>
        </form>
    )
}

export default Calendar;
