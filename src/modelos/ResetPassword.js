const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { Schema } = mongoose;
SALT_WORK_FACTOR = 10;

const ResetSchema = new Schema({
    id:String,
    email: String
    
});



module.exports = mongoose.model('reset',ResetSchema);