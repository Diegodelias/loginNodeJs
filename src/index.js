const express = require('express');

const engine =  require('ejs-mate');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');

//inicializaciones
const bodyParser = require('body-parser');
const app = express();
require('./database')
require('./passport/local-auth');

const path = require('path');
const morgan = require('morgan');


//configuraciones

app.set('views', path.join(__dirname, 'views'));
app.engine('ejs',engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);
app.use(bodyParser.json());

//middlewares
app.use(morgan('dev'));
app.use (express.static (__dirname + '/public'));
app.use(express.urlencoded({extended:false}));
app.use(session({
    secret:'misessionsecretaxxx',
    resave:true,
    saveUninitialized:true
}));



app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next)=>{
 app.locals.mensajeRegistro =   req.flash('mensajeRegistro');
 app.locals.mensajeLogin =   req.flash('mensajeLogin');
 app.locals.mensajeEmail =   req.flash('mensajeEmail');
 app.locals.usuario = req.user;
 console.log(req.usuario)
 next();

});










//rutas
app.use('/', require('./rutas/index'))
require('./rutas/index');


app.listen(app.get('port'), () => {

    console.log('Servidor en puerto', app.get('port'));


});
