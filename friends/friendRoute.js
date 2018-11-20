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
    res.status(404).json({ err: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const singleFriend = await Friend.findById(req.params.id);
    if (singleFriend) {
      res.status(200).json(singleFriend);
    } else {
      res.status(404).json("That id could not be found.");
    }
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
});

router.put("/:id", async (req, res) => {
  if (!req.body.singleName && !req.body.lastName && !req.body.age) {
    res.status(400).json("Need to input information to edit.");
  }
  try {
    const updatedFriend = await Friend.findByIdAndUpdate(req.params.id, req.body);
    if (updatedFriend) {
      res.status(201).json(updatedFriend);
    } else {
      res.status(404).json("That id could not be found.");
    }
  } catch (err) {
    res.status(400).json({ err: err.message });
  }
});

router.delete("/:id", (req, res) => {
  Friend.findByIdAndDelete(req.params.id)
    .then(friend => {
      if (!friend) {
        res.status(404).json({ errorMessage: "That friend could not be found." });
      }
      res.status(200).json("Deleted");
    })
    .catch(err => {
      res.status(400).json({ errorMessage: "The friend could not be deleted." });
    });
});

module.exports = router;
