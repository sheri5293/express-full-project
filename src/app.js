require ('dotenv').config(); // acquire dotenv it is must used for security purpose and start the server//
const express = require('express'); // acquire express

const jwt = require('jsonwebtoken'); // acquire jsonwebtoken

const path = require('path'); // used to acquire path in express
const bcrypt = require('bcrypt'); // used to hash passwords
const app = express(); // Acess varaibale name of app.js through express

const hbs = require('hbs'); // accqurie hbs from express

require('./db/conn'); //give conection of database on main page

const Register = require('./models/registers'); // acquire model register

const { json } = require('express'); // acquire json for value get

const port = process.env.port || 3000; // it port the local host ..because all public see this  (env) used for enviornmental process 3000 is jus option

const static_path = path.join(__dirname, '../public'); // it is used to directory the page

const templates_path = path.join(__dirname, '../templates/views'); // for run hbs file acces directory page

const partials_path = path.join(__dirname, '../templates/partials'); /// for run partials hbs directory

app.use(express.json()); // it is used a bit for get value in postman

app.use(
  express.urlencoded({
    extended: false,
  })
); // it is used with json to get values not show undefined

app.set('view engine', 'hbs'); // it is used for handlebar view

app.use(express.static(static_path)); // this show express.. we used static page

app.set('views', templates_path); // it show views folder name in template path

hbs.registerPartials(partials_path); //  it is used to register partial in epress and get output

//Routing

app.get('/', (req, resp) => {
  // app.get acess route and callback funtion
  resp.render('home');
});

app.get('/Home', (req, resp) => {
  // app.get acess route and callback funtion
  resp.render('home');
});

app.get('/Books', (req, resp) => {
  // app.get acess route and callback funtion
  resp.send('work complete soon');
});

app.get('/category', (req, resp) => {
  // app.get acess route and callback funtion
  resp.send('work complete soon');
});

app.get('/login', (req, resp) => {
  resp.render('login');
});

app.get('/register', (req, resp) => {
  resp.render('register');
});

app.get('/forget', (req, resp) => {
  resp.render('forget');
});

app.get('*', (req, resp) => {
  resp.render(' ');
});

// create a new user in database         and add async function then return promise
app.post('/register', async (req, resp) => {
  try {
    const Password = req.body.password;
    const cpassword = req.body.confirmpassword;

    if (Password === cpassword) {
      const registerStudent = new Register({
        //take from above line 11
        username: req.body.username, // copy from registers js page
        Email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        password: req.body.password,
        confirmpassword: req.body.confirmpassword,
      });
      //password hashing
      //! it is also called middleware ... work between two function//

      const token = await registerStudent.generateAuthToken();
//! the resp.cookie() function is used to set the cookie name to value //
//! the value paramteter maybe string or object converted into JSON//
resp.cookie('jwt', token,{          //give name and value //
 expires:new Date(Date.now()+30000),httpOnly:true

});                 
      const registered = await registerStudent.save(); // save then promise aync work
      resp.status(201).render('login');
    } else {
      resp.send('password are not matching');
    }
  } catch (error) {
    resp.status(400).send(error);
  }
});

//login check//

app.post('/login', async (req, resp) => {
  try {
    const username = req.body.username; // username from login page//
    const password = req.body.password;
    const userName = await Register.findOne({
      username: username,
    });
    const isMatch = await bcrypt.compare(password, userName.password); // compare password and userName.password
    
    const token = await username.generateAuthToken();
    resp.cookie('jwt', token,{          //give name and value //
      expires:new Date(Date.now() + 50000),httpOnly:true
      
     }); 
    
    if (isMatch) {
      resp.status(201).render('home');
    } else {
      resp.send('login failed');
    }
  } catch (error) {
    resp.status(400).send('invalid email');
  }
});

app.listen(port, () => {
  // it used callback function to check
  console.log(`server is running at port no ${port}`); // in which used template engine in javascript ecma2016
});
