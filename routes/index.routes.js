const router = require("express").Router();
const User = require('../models/User.model');


router.get("/get/:handle",async (req, res, next) => {
  const handle = req.params.handle;
  try {
      const user = await User.findOne({handle: handle});
      console.log(user);
      const userData = {
          name: user.name,
          avatar: user.avatar,
          bio: user.bio,
          links: user.links
      }
      const socials = user.socialMedia;
      return res.json({ message: 'found', userData, socials, status: 'success'})
  } catch (err) {
      console.log(err);
      return res.json({ status: 'error', error: err.message});
  }
});

// router.post("/", async (req, res, next) => {
//   const handle = req.params.handle;
//   try {
//       console.log(handle);
//       const user = await User.findOne({handle: handle});
//       const socials = user.socialMedia;
//       return res.json({ message: 'found', socials, status: 'success'})
//   } catch (err) {
//       return res.json({ status: 'error', error : err.message});
//   }
// });

module.exports = router;
