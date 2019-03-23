import React, {useContext, useEffect} from 'react';
import classes from './Home.scss';
import Page from "../Page/Page";
import {UserContext} from "../../UserContext";

const Home = () => {

    const routesData = useContext(UserContext);
    const details = () => {
        return routesData.map(({details, legs}) => {
            return (
                <div className={classes.data} key={Math.random()}>
                    <div className="arrivalTime">{legs.arrival_time.text}</div>
                    <div>{details.destination}</div>
                    <div>
                        <p>{`Leave by ${legs.departure_time.text}`}</p>
                        <p>{`${legs.duration.text}`}</p>
                    </div>
                </div>
            )
        })
        return <p>Hi</p>;
    }

    return (
            <div className={classes.Home}>
                <header className={classes.HomeHeader}>
                    <h1 className={classes.HomeTitle}>Home Header</h1>
                </header>
                <div>
                    {details()}
                </div>
            </div>
    );
}

export default Home;
