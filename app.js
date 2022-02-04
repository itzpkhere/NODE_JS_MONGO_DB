const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');

const app = express();

// middleware
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(express.json());
app.use(cookieParser());


// database connection
const dbURI = 'mongodb+srv://itzpkhere:itz_pk_here@nodetuts.epwi7.mongodb.net/node-tuts'
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true})
.then((result) => app.listen(3000))
.catch((err) => console.log(err));


// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);


// cookies
app.get('/set-cookies',(req, res) => {
    // res.setHeader('Set-Cookie','newUser = true');
    res.cookie('newUser', false);
    res.cookie('isEmployee', true, { maxAge : 1000 * 60 * 60 * 24, httpOnly: true});
    res.send('you got the cookies');
})

app.get('/read-cookies',(req, res) => {
    const cookies = req.cookies;
    console.log(cookies);
    res.send(cookies);
})