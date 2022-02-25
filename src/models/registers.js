const mongoose = require('mongoose'); // acquire mongoose
const bcrypt = require('bcrypt'); // acquire bcrypt

const jwt = require('jsonwebtoken'); // acquire jsonwebtoken
const { response } = require('express');

const studentSchema = new mongoose.Schema({
  // define schema  we should used any name

  username: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: Number,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },

  confirmpassword: {
    type: String,
    required: true,
  },
  //field define//
  tokens: [
    {
      //token is array of object//

      token: {
        //token is object//
        type: String,
        required: true,
      },
    },
  ],
});

//generating tokens//
studentSchema.methods.generateAuthToken = async function () {
  //methods are defined on documents(instance) ....while statics are defined on the model directly work with collection
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    ); // payload mean our unique thing jus like id and in string we used token S
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    resp.send('the error part' + error);
    console.log('the error part' + error);
  }
};

studentSchema.pre('save', async function (next) {
  //pre defined function//

  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);

    this.confirmpassword = await bcrypt.hash(this.confirmpassword, 10);
  }
  next(); //next defined function//
});

// now we need to create collection

const Register = new mongoose.model('Register', studentSchema); //Register used database collection name and add empolyee scheme which we publish on front page

// now export  then pass collection wala Register

module.exports = Register;
