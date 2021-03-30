const passport = require('passport');
const bcrypt = require('bcryptjs');
passport.serializeUser((usuario, done) =>{
  done(null,usuario.id)

});

passport.deserializeUser( async (id, done) =>{

    const usuario = await Usuario.findById(id);
    done(null,usuario)
     
      
      });

  const LocalStrategy = require('passport-local').Strategy;

const Usuario = require('../modelos/usuario')


      passport.use('local-signup',new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback : true
    }, async (req, email, password, done) => {

      const usuarioFind =  await Usuario.findOne({email: email});
          if(usuarioFind){
            return done(null, false, req.flash('mensajeRegistro','El email ya existe'));

            
          } else {
            try {
              const usuario= await Usuario.create({ email, password })
              return done(null, usuario)
          } catch (e) {
              done(e)
          }

          }

     
    }))













// const LocalStrategy = require('passport-local').Strategy;

// const Usuario = require('../modelos/usuario')

// passport.use('local-signup', new LocalStrategy({
//         usernameField: 'email',
//         passwordField: 'password',
//         passReqToCallback: true


// }, async (req,email, password , done) => {

//       const usuario =  await Usuario.findOne({email: email});

//       if(usuario) {
//         return done(null, false, req.flash('mensajeRegistro','El email ya existe'));
//       } else {

//         const nuevoUsuario =  new Usuario();
//         nuevoUsuario.email = email;
//         nuevoUsuario.password = nuevoUsuario.encriptarPassword() ;
//         await nuevoUsuario.save();
//         done(null, nuevoUsuario)



//       }




// }));


passport.use('local-signin', new LocalStrategy({

  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true




}, async (req, email, password, done) =>{
    const usuario = await Usuario.findOne({email: email});
   
    // console.log ("usuariocomparapassword" + usuario.comparePassword(password))
   try {
    if(!usuario){
       return done(null,false, req.flash('mensajeLogin','No se encontro el usuario'))
       
      
    }
    const validar = await usuario.comparePassword(password)
    if(!validar){
      return done(null, false, req.flash('mensajeLogin','Password incorrecto'))
  
    
      
    }

    return done(null, usuario);
    
   }
   catch(err){
     return done(err)

   }

}));