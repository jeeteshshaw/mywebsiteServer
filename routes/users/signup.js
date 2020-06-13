const router = require('express').Router();
const User = require("../../model/User");
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const bycrypt = require('bcryptjs');
const { signupValidation } = require("../../validation");


// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', async(req, res, next) =>{
    const {error} = signupValidation(req.body);
    if(error)
    return res.status(400).send({error:error.details[0].message});

    const emailExist = await User.findOne({email: req.body.email});
    if(emailExist)
    return res.status(400).send({error:"Email already register"});
    const verifyEmail = CheckEmail(req.body.email)
    if(!verifyEmail)
    return res.status(400).send({error: "Give a valid Email"})
    const salt = await bycrypt.genSalt(10);
    const password_hash = await bycrypt.hash(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: password_hash
    });
    try {
        const saveUser = await user.save(); 
        const token = jwt.sign({id: saveUser._id}, process.env.SERECT_TOKEN)
        res.header('auth-token', token).send({token: token});
    } catch (error) {
        return res.status(400).send(error);
    }
    // res.status(200).send(req.body);

})

const CheckEmail = (email) => {
    fetch(`${process.env.EMAIL_VERIFY}$email=${email}&smtp=1&format=1`)
    .then(res => res.json())
    .then(res => {
        if(res.smtp_check == true)
        return true;
        return false;
    })
}


module.exports = router;