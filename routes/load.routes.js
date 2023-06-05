const router = require("express").Router();
const User = require('../models/User.model');
const jwt_decode = require('jwt-decode');

router.post("/socials", async (req, res, next) => {
    const {tokenMail} = req.body;
    console.log("token from backend load:", tokenMail);

    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log(email);
        const user = await User.findOne({email: email});
        const socials = user.socialMedia;
        return res.json({message: 'found', socials, status: 'success'});
    } catch (error) {
        return res.json({status: 'error', error: error.message});
    }
  });

  router.post("/links", async (req, res, next) => {
    const {tokenMail} = req.body;
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log(email);
        const user = await User.findOne({email: email});
        const links = user.links;
        return res.json({message: 'found', links, status: 'success'});
    } catch (error) {
        return res.json({status: 'error', error: error.message});
    }
  });

  module.exports = router;
