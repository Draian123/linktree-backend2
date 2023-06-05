const router = require("express").Router();
const User = require('../models/User.model');
const jwt_decode = require('jwt-decode');


router.post("/socials", async (req, res, next) => {
    const {tokenMail, socials} = req.body;
    console.log(req.body);
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        user.socialMedia = socials;
        user.save();
        return res.json({message: 'saved', status: 'success'});
    } catch (err) {
        return res.json({status: 'error', error: err.message});
    }
  });

  router.post("/profile", async (req, res, next) => {
    const {tokenMail, name, bio, avatar} = req.body;
    console.log(req.body);
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        user.name = name;
        user.bio = bio;
        user.avatar = avatar;
        user.save();
        return res.json({message: 'saved', status: 'success'});
    } catch (err) {
        return res.json({status: 'error', error: err.message});
    }
  });

  router.post("/links", async (req, res, next) => {
    const {tokenMail, links} = req.body;
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log(email);
        const user = await User.findOne({email: email});
        console.log(user);
        const newLinks = links.map((link)=>({
            url: link.link.url,
            title: link.link.title,
            icon: link.link.icon
        }))
        user.links = newLinks;
        await user.save();
        return res.json({message: 'saved', status: 'success'});
    } catch (err) {
        return res.json({status: 'error', error: err.message});
    }
  });

  module.exports = router;
