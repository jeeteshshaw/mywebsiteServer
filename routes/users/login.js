const router = require("express").Router();
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Users = require("../../model/User");
const { loginValidation } = require("../../validation");


dotenv.config();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

router.post('/', urlencodedParser, async (req, res, next) => {
    const { error } = loginValidation(req.body);
    if(error)
    return res.status(400).send({error:error.details[0].message});
    // const salt = await bcrypt.genSalt(10);
    // const password_hash = await bcrypt.hash(req.body.password, salt);

    const user = await Users.findOne({ email: req.body.email });
    if(!user) return res.status(400).send({error: " Email or Password is wrong "});

    const vaildpass = await bcrypt.compare(req.body.password, user.password);
    if(!vaildpass) return res.status(400).send({error: "Email or Password is wrong "});
    const token = jwt.sign({id: user._id}, process.env.SERECT_TOKEN)
    res.header('auth-token', token).send({token: token});
    // res.status(200).send(req.body);
})

module.exports = router;