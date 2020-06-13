const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        min: 6,
        max: 255,
        require: true
    },
    email:{
        type: String,
        min: 6,
        max: 255,
        require: true,
        unique: true
    },
    password:{
        type: String,
        min: 6,
        max: 1024,
        require: true
    },
    date:{
        type: Date,
        require: true,
        default: Date.now
    }
});

module.exports = mongoose.model("users", userSchema);