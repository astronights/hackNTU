import React, {useContext, useState} from 'react';
import classes from './Home.scss';
import {UserContext} from "../../UserContext";
import Modal from '../Modal/Modal';
import API from "../../utils/API";
import Navbar from "../UI/Navbar/Navbar";
import html2canvas from 'html2canvas';

const Home = () => {
    const getKey = ({lat:lat1, lng:lng1},{lat:lat2, lng:lng2}) => lat1.toString() + lng1.toString() + lat2.toString() + lng2.toString();
    const [modalElem, setModalElem] = useState(null);
    const {data:routesData, media} = useContext(UserContext);
    const individualRoutesArray = () => {
        let obj = {};
        routesData.forEach(({details, legs}, index) => {
            let key = getKey(legs.start_location, legs.end_location);
            obj[key] = (
                <div className={classes.routeModalData}>
                    {
                        legs.steps.map((s, sIndex) => {
                            return (
                                <div className={classes.step}>
                                    <p><i
                                        className="material-icons">{s.travel_mode == "WALKING" ? "directions_walk" : "directions_transit"}</i>
                                    </p>
                                    <p>{(sIndex == legs.steps.length - 1) ? `Walk to ${details.destination}` : s.html_instructions}</p>
                                    <p>{s.duration.text}</p>
                                </div>
                            )

                        })
                    }
                </div>
            );
                // return obj;
        }) //end loop

        return obj;
    }

    const getIndividualRoute = (key) => {
        return individualRoutesArray()[key];
    }


    const toggleClass = (idName) => {
        // console.log(elem.children[0].classList.value)
        document.getElementById(idName).classList.toggle('extendedActiveMenu');
    }

    const directionsClickHandler = () => {
        getIndividualRoute()
    }

    const placesModal = async ({lat, lng:lon}) => {

        const placesData = await API.get(`/places?lat=${lat.toString()}&lon=${lon.toString()}`)
        // console.log(await placesData.data.map(e => {type: e.type}))
        const placesElem = await placesData.data.slice(0,6).map(e => (
                        <div className={classes.placeRecom}>
                             <p>{e.type}</p>
                             <p>{e.name}</p>
                        </div>
                    ))
        console.log("before calling set modal")
        console.log(placesElem)
        activateAndSetModal(placesElem);
        // console.log(placesData.data);
        // setModalElem();
    }

    const activateAndSetModal = (elem) => {

        // console.log("modal activated");
        setModalElem(elem);
        document.getElementById("modal").classList.add('activeModal');
        document.getElementById("modal").style.top=`calc(${window.pageYOffset}px + 50%)`;
    }

    const details = () => {
        return routesData.map(({details, legs, fares}, index) => {
            return (
                <div>
                    <div className={classes.data} key={index}>
                        <div className={classes.travelSection}>
                            <div className={[classes.blank, classes.section].join(" ")}>
                                {`$${fares/100}`}
                            </div>

                            <div className={classes.section}>
                                {(index != 0) && <div onClick={(e) => toggleClass(`extendedMenu${getKey(legs.start_location, legs.end_location)}`)}
                                                      className={[classes.extraTime, classes.linedIcon2].join(" ")}>
                                    <div id={`extendedMenu${getKey(legs.start_location, legs.end_location)}`} className={[classes.extendedMenu].join(" ")}>
                                        <div onClick={() => placesModal(legs.start_location)} className={classes.icon}></div>
                                        <div className={[classes.icon, (media == "youtube") ? classes.youtube : (media=="spotify"?classes.spotify:classes.netflix)].join(" ")}></div>
                                    </div>
                                </div>}
                                <div
                                    onClick={() => {

                                        activateAndSetModal(getIndividualRoute(getKey(legs.start_location, legs.end_location)))
                                    }}
                                    className={[classes.SMRT, (index != 0) ? classes.linedIcon2 : classes.linedIcon, "directionClick"].join(" ")}></div>
                            </div>

                            <div className={[classes.details, classes.section].join(" ")}>
                                <p>{`Leave by ${legs.departure_time.text}`}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.place}>
                        <p className={classes.blank}></p>
                        <p className={classes.placeName}>{`${details.destination}`}</p>
                        <p className={classes.time}>{`${legs.arrival_time.text}`}</p>
                    </div>

                </div>
            )
        });
    }

    return (

        <div className={classes.Home}>
            <Navbar />

            <div>
                <div onClick={() => {
                    html2canvas(document.querySelector("#root")).then(canvas => {
                        document.body.appendChild(canvas)
                    });
                }} className={classes.home}></div>
                {details()}
                {/*{individualRoutes()}*/}


            </div>
            <Modal>
                {modalElem}
            </Modal>
        </div>
    );
}

export default Home;

