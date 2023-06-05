const router = require("express").Router();
const User = require('../models/User.model');
const jwt_decode = require('jwt-decode');


router.post("/dashboard", async (req, res, next) => {
    const {tokenMail } = req.body;
    try {
        const decodedTokenMail = jwt_decode(tokenMail, process.env.SECRET_JWT);
        const email = decodedTokenMail.email;
        console.log('decoded email', email)
        const user = await User.findOne({email: email});
        const userData = {
            name: user.name,
            role: user.role,
            bio: user.bio,
            avatar: user.avatar,
            handle: user.handle,
            links: user.links.length
        }
        return res.json({message: 'User loaded', userData, status: 'Okay'})
    } catch (err) {
        return res.json({status: 'error', error: err.message})
    }
  });

  module.exports = router;
