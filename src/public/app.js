const loginEnviar = document.querySelector('#loginEnviar');

const email = document.querySelector('#email');

const password = document.querySelector('#password');

const formulario = document.querySelector('#formulario');

const btnReset = document.querySelector('#resetBtn');

const er = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


eventListeners();
function eventListeners(){
    //arranque app
    document.addEventListener('DOMContentLoaded', iniciarApp);
    //campos formularios
    email.addEventListener('blur', validarFormulario);
    password.addEventListener('blur',validarFormulario);
    //reset fromulario

    btnReset.addEventListener('click',  resetearFormulario);
    formulario.addEventListener('submit', loguearse);
}



function iniciarApp(){

     loginEnviar.disabled = true;
     loginEnviar.classList.add('cursor-not-allowed', 'opacity-50')

}


function validarFormulario(e){
    
   if(e.target.value.length > 0){

    const error = document.querySelector('p.error');
    if(error) {
        error.remove();

    }
    
    e.target.style.borderBottomColor = '#64dfdf';

   } 
 

   else {
        e.target.style.borderBottomColor = 'red';
        // e.target.classList.add('border', 'border-red-500');
        mostrarError('Todos los campos son obligatorios');

   }

  if( e.target.type === 'email' ) {
   
 
    if(er.test( e.target.value )){
        const error = document.querySelector('p.error');
        if(error){
            error.remove();
        }
     
        e.target.style.borderBottomColor = '#64dfdf';
    
        console.log('Email válido');
    } else {
        e.target.style.borderBottomColor = 'red';
        // e.target.classList.add('border', 'border-red-500');
        mostrarError('Email inválido');
    }
} 
  if(er.test( email.value ) && password.value != ''){

    console.log('pasaste la validación');
    loginEnviar.disabled = false;
    loginEnviar.classList.remove('cursor-not-allowed', 'opacity-50')


  } else {

    console.log('hay campos por validar');

  }
}
function mostrarError(mensaje) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = mensaje;
    mensajeError.classList.add('border','border-red-500', 'background-red-100','tex-red-500', 'p-3','mt-5', 'text-center','error');

    const errores = document.querySelectorAll('.error');

    if (errores.length === 0){
        formulario.appendChild(mensajeError);
    }
   



}

function loguearse(e){
    // e.preventDefault();
   



    const spinner = document.querySelector('#spinner');
    spinner.style.display = 'flex';

    //despues de 3 segundos ocultar spinner
    setTimeout(()=>{
        spinner.style.display = 'none';
        //mensaje exito
        const parrafo = document.createElement('p');
        parrafo.textContent = 'Login exitoso!';
        parrafo.classList.add('text-center','my-10', 'p-2', 'bg-green-500', 'text-white', 'font-bold', 'uppercase');
        //inseta parrado antes del spinner
        formulario.insertBefore(parrafo, spinner);
       setTimeout(() =>{

           parrafo.remove();
           resetearFormulario(e);
    
       },5000);
    }, 3000 );


   

}

//funcion reseteo forumulario

function resetearFormulario(e){
    e.preventDefault();
    formulario.reset();
    email.style.borderBottomColor =  '#d1d5db';
    password.style.borderBottomColor =  '#d1d5db';
    
    iniciarApp();

}