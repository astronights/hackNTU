const express = require('express');
const app = express();
const https = require('https');
const fetch = require("node-fetch");
var http = require('http');
const cors = require('cors');

app.use(cors())
app.set('json spaces', 2);

app.get('/', async (req, res) => {
    const gcal = require("google-calendar")
    const accessToken = "ya29.GlzVBrHTKJSErDx0vnwedR6c6P1QBIjY0IFVpwZp2SwKAyXZFdC11pKR9e8HW5-GQqWNckOZGoxJOln7oBWpuI4qRNAKp50CD6pfVEKq1jnAxGvbr7wUIqT7yyxoag";
    const google_calendar = new gcal.GoogleCalendar(accessToken);
    const HOME = "Hall 5 NTU"; //default is _HOME_
    let start_place = HOME; //default is _HOME_
    let destination = HOME; //default is _HOME_
    let arrivalTime;
    let directions = [];

    google_calendar.events.list("primary", {
        timeMax: "2019-03-25T15:59:59Z",
        timeMin: "2019-03-25T00:00:00Z"
    }, function (err, calendarList) {


        calendarList.items.map(e => {


            arrivalTime = (new Date(e.start.dateTime).getTime()) / 1000;
            destination = e.location;
            let detailsP = {
                start_place, destination
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
