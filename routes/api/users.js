const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken')
const authenticateToken = require('../../middleware/auth')

//? Create a new user
router.post("/", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash(req.body.password, salt);
    const userObj = {
      fname: req.body.fname,
      lname: req.body.lname,
      email: req.body.email,
      password: password,
    };
    const user = new User(userObj);
    await user.save();
    return res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
});

//? Login a user
router.post("/login", async (req, res) => {
  try {
    const { type, email, password, refreshToken } = req.body;
    if (type == "email") {
      const user = await User.findOne({ email: email });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }else{
        await handleEmailLogin(password, user, res)
      }
    }
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

//? Get user profile
router.get("/profile", authenticateToken,async (req, res) => {
  try {
    const id = req.user._id;
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

async function handleEmailLogin(password, user, res){
     const isValidPassword = await bcrypt.compare(password, user.password)
     if(isValidPassword){
        const userObj = await generateUserObject(user)
        return res.json(userObj)
     }else{
      return res.status(401).json({ message: "Unable to Login" });
     }
}

function generateUserObject(user){
    const { accessToken, refreshToken } = generateToken(user);

    const userObj = user.toJSON()
    userObj['accessToken'] = accessToken
    userObj['refreshToken'] = refreshToken
    return userObj
}

function generateToken(user) {
    const accessToken = jwt.sign({
        email: user.email,
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '1d'
    });
    const refreshToken = jwt.sign({
        email: user.email,
        _id: user._id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
    return { accessToken, refreshToken };
}
