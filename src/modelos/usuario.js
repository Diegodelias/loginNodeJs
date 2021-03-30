const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
    email:String,
    password:String
    
});


userSchema.pre('save', async function (next) {
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})




// userSchema.methods.encriptarPassword =  (password) => {
//    return  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// };

userSchema.methods.comparePassword = async function (password) {
console.log(this.password)
console.log(password)
const compare = await bcrypt.compare(password, this.password)
 return compare
 
 };


 userSchema.statics.getUser  = async function getUser(emailUser) {
    const thisUsuario = await userSchema.findOne({email: emailUser}, (error,data) =>{
        if(error){
            console.log(error)
        } else {
            console.log(data)

        }
    })
   
    return thisUsuario;
}


module.exports =mongoose.model('usuario',userSchema);
 