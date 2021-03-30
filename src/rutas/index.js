const express = require('express');
const router = express.Router();
const passport = require('passport');
const { deleteOne } = require('../modelos/ResetPassword');
const resetModel = require("../modelos/ResetPassword");
const enviarLinkReset = require('../enviarEmail');
const peticionReset = require('../peticionReset');
const usuarioModelo = require("../modelos/usuario");
const bcrypt = require("bcryptjs");



const { v1: uuidv1 } = require('uuid');

router.get('/', (req, res, next) => {
    

    
   if (req.session.logueado){
    res.render('perfil');
    

   } else { res.render('login');
} 

 
    
    

});

router.get('/registro', (req, res, next) => {


    
   if (req.session.logueado){
    res.render('perfil');
    

   } else { res.render('registro');
} 

 
    
});


router.post('/registro', passport.authenticate('local-signup', {

    successRedirect:'/perfil',
    failureRedirect:'/registro',
    failureFlash: true
}));



router.get('/login', (req, res, next) => {

   if (req.session.logueado){
    res.render('perfil');
    

   } else { res.render('login'); } 

   
    


});

router.post('/login', passport.authenticate('local-signin', {

    successRedirect:'/perfil',
    failureRedirect:'/login',
    // passReqToCallback: true
    failureFlash: true

}));


router.get('/logout', (req, res, next) => {
    req.session.logueado = false;
    req.logout();
    res.redirect('/');
})


// router.use((req, res , next) =>{
//     isAuthenticated(req, res, next);
//     next();
// })


router.get('/perfil' ,  isAuthenticated ,(req, res, next) => {

    req.session.logueado = true;

    console.log(req.app.locals.usuario)
  
    res.render('perfil');

});

const usuario = require("../modelos/usuario");


router.get('/forgot' , (req, res, next) => {
 
 
    res.render('forgotpassword');

});





router.post('/forgot', async (req, res, done) => {
    // const thisUser = getUser(req.body.email);
    failureFlash: true
    
    const { email } = req.body
    console.log("body email " + email)
    const thisUsuario = await usuario.findOne({email: email}, (error,data) =>{
        if(error){
            console.log(error)
           
         
        } else {
            console.log(data)

        }
    })
    console.log(thisUsuario)
    if (thisUsuario) {
        const id = uuidv1();
        const request =   new resetModel({id: id, email: req.body.email});
        request.save((error,data)=> {
            if(error){
                console.log(error)
            } else {
                done(null,data)

            }

        })

        enviarLinkReset(thisUsuario.email,id)
        // sendResetLink(thisUser.email, id);
        res.render('login');
    } if(!thisUsuario) {
        req.flash('mensajeEmail ','No se encontro el EMAIL');
        console.log('no se encontro usuario')
  
  
         
            
           
       
    }
  
  
});

router.get('/reset/:id' , (req, res, next) => {

    res.locals.queryId = req.params.id;
    res.render('nuevoPassword');
    next();
});





router.post('/reset/:id', async (req, res, done) => {
    // modeloReset
 
    console.log("req params id" + req.params.id)
    const thisRequest =  await peticionReset.getResetRequest(req.params.id);
   
    if (thisRequest) {

        const user =   await usuarioModelo.findOne({email: thisRequest[0].email}, (error,data) =>{
            if(error){
                console.log("unerror" + error)
            } else {
                console.log("todo ok" + data)
    
            }
        })

        console.log("passwordcito" + JSON.stringify(req.body.password));
       
       bcrypt.hash(req.body.password,10).then(hashed =>{
             user.updateOne({password:hashed}, (error,data) =>{
            if(error){
                console.log(error)
            } else {
                console.log(data)
                res.render('login');
            
    
            }
        })    

        })

      
    }



  
});





function isAuthenticated (req, res, next) { //is Authticated es de passport

    if(req.isAuthenticated()){
        return next();

    } 

    res.redirect('/login');
};









module.exports = router;