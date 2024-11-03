const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//? Create a new user
router.post("/", async (req, res) => {
  try {
    const userObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
    };
    const user = new User(userObj);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//? Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    return res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//? Get one user
router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//? Update One User
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const userBody = req.body;
    const updateUser = await User.findByIdAndUpdate(id, userBody, {
      new: true,
    });
    if (updateUser) {
      return res.json(updateUser);
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//? Delete one user
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedUser = await User.findByIdAndDelete(id);
    if (deletedUser) {
      return res.json({ message: "User is deleted" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;
