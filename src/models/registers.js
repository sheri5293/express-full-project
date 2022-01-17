const mongoose = require("mongoose"); // acquire mongoose 

const studentSchema = new mongoose.Schema({ // define schema  we should used any name

    username: {
        type: String,
        required: true
    },


    Email: {
        type: String,
        required: true,
        unique: true

    },

    phoneNumber: {
        type: Number,
        required: true,
        unique: true

    },

    password: {

        type: String,
        required: true

    },

    confirmpassword: {
        type: String,
        required: true
    }

})

// now we need to create collection

const Register = new mongoose.model("Register", studentSchema); //Register used database collection name and add empolyee scheme which we publish on front page 


// now export  then pass collection wala Register

module.exports = Register;