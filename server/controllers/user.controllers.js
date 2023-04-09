const User = require("../models/user.model");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  // Register new user
  register: async (req, res) => {
    let exist = await User.findOne({ email: req.body.email });
    if (exist) {
      res.status(400).json({ error: "user already exists" });
    } else {
      User.create(req.body).then((user) => {
        const userToken = jwt.sign(
          {
            id: user._id,
          },
          process.env.SECRET_KEY
        );

        res
          .cookie("usertoken", userToken, process.env.SECRET_KEY, {
            httpOnly: true,
          })
          .json({
            msg: "success!",
            currentUser: { name: user.name, email: user.email },
          });
      });
    }
  },
  login: async (req, res) => {
    const user = await User.findOne({ email: req.body.email });

    if (user === null) {
      return res.status(400).json({ error: "account does not exist" });
    }
    const correctPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!correctPassword) {
      return res.status(400).json({ error: "invalid email or password" });
    }

    const userToken = jwt.sign(
      {
        id: user._id,
      },
      process.env.SECRET_KEY
    );

    res
      .cookie("usertoken", userToken, process.env.SECRET_KEY, {
        httpOnly: true,
      })
      .json({ name: user.name, email: user.email });
  },
  logout: (req, res) => {
    res.clearCookie("usertoken").sendStatus(200);
  },
  findOne: (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    User.findById(decoded.id)
      .then((user) =>
        res.json({
          name: user.name,
          email: user.email,
        })
      )
      .catch((error) => res.status(400).json(error));
  },
  findAll: (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    console.log(decoded.id);
    User.find()
      .then((users) => res.json(users))
      .catch((error) => res.status(400).json(error));
  },
  update: (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    })
      .then((user) => res.json(user))
      .catch((error) => res.status(400).json(error));
  },
  delete: (req, res) => {
    User.findByIdAndDelete(req.params.id)
      .then((deletedUser) => res.json(deletedUser))
      .catch((error) => status(400).json(error));
  },
};
