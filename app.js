const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressValidator = require('express-validator');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const app = express();
  
app.set('view engine', 'pug');

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressValidator());
app.use(cookieParser())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}));

function setTime(req, res, next){
    if(!res.cookie.time)
        res.cookie('time',  new Date());
    next();
}


app.get('/',setTime, (req, res)=>{
        res.render('time', { time: req.cookies.time });

});

app.get('/myroute/:param', (req, res)=>{
    const param = req.params.param;
    const query= req.query.param?req.query.param:'';
    const  header= req.get(param)?req.get(param):'';
    const cookie= req.cookies.param?req.cookies.param:'no cookies';
    res.render('param',{ param, query, header, cookie })
})


app.listen(3000, () => {
    console.log('server started')
});