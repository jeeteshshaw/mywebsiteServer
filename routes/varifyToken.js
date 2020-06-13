const jwt = require('jsonwebtoken');
const router = require('express').Router()

 router.post('/',(req, res, next) => {
    const token = req.body.token;
    if(!token)
    return res.status(401).send({error: 'Access Denied'});

    try{
        const verified = jwt.verify(token, process.env.SERECT_TOKEN);
        
        if(verified){
            res.status(200).send({res:"verified"})
        }

    }catch(err){
        res.status(400).send({error: 'Invalid Token'});
    }
 })

 module.exports = router