import React, {useContext} from 'react';
import classes from './Home.scss';
import {UserContext} from "../../UserContext";

const Home = () => {

    const routesData = useContext(UserContext);

    const details = () => {
        return routesData.map(({details, legs}, index) => {
            return (
                <div>
                    <div className={classes.data} key={Math.random()}>
                        <div className={classes.travelSection}>
                            <div className={[classes.blank, classes.section].join(" ")}></div>

                            <div className={classes.section}>
                                {(index!=0) && <div className={[classes.extraTime, classes.linedIcon2].join(" ")}>
                                    <div className={classes.extendedMenu}>
                                        <div className={classes.icon}></div>
                                        <div className={classes.icon}></div>
                                        <div className={classes.icon}></div>
                                    </div>
                                </div>}
                                <div className={[classes.SMRT, (index!=0) ? classes.linedIcon2 : classes.linedIcon].join(" ")}></div>
                            </div>

                            <div className={[classes.details, classes.section].join(" ")}>
                                <p>{`Leave by ${legs.departure_time.text}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.place}>
                        <p className={classes.time}>{`${legs.arrival_time.text}`}</p>
                        <p className={classes.placeName}>{`${details.destination}`}</p>
                        <p className={classes.blank}></p>
                    </div>
                </div>
            )
        });
    }

    return (
        <div className={classes.Home}>

            <div>
                <div className={classes.home}></div>
                {details()}
            </div>
        </div>
    );
}

export default Home;


{/*<div className="arrivalTime">{legs.arrival_time.text}</div>*/
}
{/*<div>{details.destination}</div>*/
}
{/*<div>*/
}
{/*<p>{`Leave by ${legs.departure_time.text}`}</p>*/
}
{/*<p>{`${legs.duration.text}`}</p>*/
}
{/*</div>*/
}