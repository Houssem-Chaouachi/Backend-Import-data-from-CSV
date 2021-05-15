const mongoose = require('mongoose');
const schema = mongoose.Schema ;

const userSchema =new schema ({
    email:{
        type: String,
        require:[ true, 'email is required']
    },
    password:{
        type:String,
        required: [true, 'password is required']
    }
})

const userModel = mongoose.model('userModel', userSchema);
module.exports = userModel