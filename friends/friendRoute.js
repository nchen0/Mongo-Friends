const router = require("express").Router();
const Friend = require("./friendModel");

router.get("/", (req, res) => {
  Friend.find()
    .then(foundFriends => {
      res.status(200).json(foundFriends);
    })
    .catch(err => {
      res.status(404).json({ error: err.message });
    });
});

router.post("/", async (req, res) => {
  const newFriend = new Friend(req.body);
  try {
    const savedFriend = await newFriend.save();
    res.status(201).json(savedFriend);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
