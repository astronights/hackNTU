const express = require('express');
const app = express();
const https = require('https');
const fetch = require("node-fetch");
var http = require('http');
const cors = require('cors');

app.use(cors())
app.set('json spaces', 2);

const getFares = (json) => {
    console.log("Shub got work to do!")
}

app.get('/', async (req, res) => {
    ///?accessToken&?home=fghjk&?
    const gcal = require("google-calendar")
    const accessToken = "ya29.GlzVBpCdnkV7WIMfVMS8h7shpgVgVTgRbF4LSG5CJZzytzJj9avLEuLpmqVbJ0Oqql6GZ2eg19X08xVvjSPfB-jeiB6SLy6DSz22d7JWOWZ6SaZqAVQFFkwIgGPj2A";
    const google_calendar = new gcal.GoogleCalendar(accessToken);
    const HOME = "Hall 5 NTU"; //default is _HOME_
    let start_place = HOME; //default is _HOME_
    let destination = HOME; //default is _HOME_
    let arrivalTime;
    let directions = [];

    google_calendar.events.list("primary", {
        timeMax: `2019-03-25T15:59:59Z`, //`2019-${month}-${day}`
        timeMin: `2019-03-24T16:00:00Z`
    }, function (err, calendarList) {

        calendarList.items.map(e => {


            arrivalTime = (new Date(e.start.dateTime).getTime()) / 1000;
            destination = e.location;
            let detailsP = {
                start_place,
                destination,
            }

            let url = `https://maps.googleapis.com/maps/api/directions/json?origin=${start_place.replace(/ /g, "+")}&destination=${destination.replace(/ /g, "+")}&arrival_time=${arrivalTime}&mode=transit&key=AIzaSyCkuHNW1JRQY9o-zLyCg65EuOws1vIP-RE`;
            start_place = e.location;
            // console.log(url);

            directions.push(new Promise((resolve, reject) => {
                https.get(url, (resp) => {
                    let data = '';

                    resp.on('data', (d) => {
                        data += d;
                    });

                    resp.on('end', () => {
                        resolve({
                            details: detailsP,
                            fares: new Promise((resolve, reject) => resolve(getFares(JSON.parse(data)))),
                            data: JSON.parse(data)
                        });
                    });

                }).on('error', (err) => {
                    reject(err);
                })
            }));


        });

        Promise.all(directions)
            .then(values => {
                res.json(values.map(v => {
                    return {
                        details: v.details,
                        legs: v.data.routes[0].legs[0]
                    }
                }))
            })
            .catch(err => {
                res.send(err)
            })
    })
})

const listener = app.listen(7023, () => {
    console.log('Your app is listening on port ' + listener.address().port);
});
