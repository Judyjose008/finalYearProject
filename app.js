//dependencies

const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const users = require('./routes/users');  //user routes.
const config = require('./config/database');

//body parser middleware allows to parse the json file.
app.use(bodyParser.json()); //this should be always below the app initialzation.

mongoose.connect(config.database);

//Conncetion ON 
mongoose.connection.on('connected', ()=>{
    console.log('connected to the database '+config.database);
});

//Connection Error
mongoose.connection.on('error', (err) => {
    console.log('Connection error '+err);
});


const port = 3000;

app.use(cors());
app.use('/users',users)

//adding middleare passport for authentication
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

//adding client site to backend
app.use(express.static(path.join(__dirname, 'public')));
 
// START THE SERVER
app.listen(port, () => {
    console.log("******  SERVER STARTED ******");
    console.log("server started on port "+port);
});


// INDEX ROUTE
app.get( '/' , (req, res) => {
    res.send('Invalid Endpoint');
});
