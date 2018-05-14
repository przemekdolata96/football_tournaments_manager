var express = require('express');        // call express
var app = express();                 // define our app using express
var bodyParser = require('body-parser');
const mongoData = require('./private.js');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port

// BASE SETUP
var mongoose = require('mongoose');
mongoose.connect(`mongodb://${mongoData.dbuser}:${mongoData.dbpassword}@ds163119.mlab.com:63119/footballtournaments`); // connect to our database
//var Player = require('./api/models/player');
var Team = require('./api/models/team');
var Player = require('./api/models/team');
// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// test route to make sure everything is working (accessed at GET http://localhost:3000/api)
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.get('/', function (req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/teams')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function (req, res) {
        var team = new Team({
            name: 'Moj Team',
            players:[{
                firstName: 'Przemek',
                lastName: 'Dolata',
                number: 7,
                goals: 5,
                assistants: 5
            }]
            //players: req.body.players
        });      // create a new instance of the Bear model
        //player.name = req.body.name;  // set the bears name (comes from the request)


        team.update(
            { _id: '5ae76ef752baa31da062bee9' },
            {
                $push: {
                    players: {
                        firstName: 'Cristiano',
                        lastName: 'Ronaldo',
                        number: 7,
                        goals: 5,
                        assistants: 5
                    } } }
        )
        // save the bear and check for errors
        team.save(function (err) {
            if (err)
                res.send(err);

            res.json({ message: 'Team created!' });
        });
    })

   .get(function (req, res) {
        Team.find(function (err, teams) {
            if (err)
                res.send(err);

            res.json(teams);
        });
    });
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);


