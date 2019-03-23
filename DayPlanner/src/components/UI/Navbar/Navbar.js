import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import classes from './Navbar.scss';
import DatePicker from "react-datepicker";

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import DatePickerCust from "./DatePickerCust/DatePickerCust";

const Navbar = () => {
    const [startDate, setStartDate] = useState(new Date());

    return (
        <header className={classes.Header}>
            <div className={classes.calendar}>
                <DatePicker
                    customInput={<DatePickerCust/>}
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
            </div>
        </header>
    );
}


export default Navbar;
