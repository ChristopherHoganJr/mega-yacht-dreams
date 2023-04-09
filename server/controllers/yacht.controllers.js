const Yacht = require("../models/yacht.model");

const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  new: async (req, res) => {
    let yachtInfo = req.body;
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    let user;
    await User.findById(decoded.id)
      .then((foundUser) => {
        Yacht.create({
          owner: foundUser._id,
          title: yachtInfo.title,
          address: yachtInfo.address,
          photos: yachtInfo.photos,
          description: yachtInfo.description,
          amenities: yachtInfo.amenities,
          additionalInfo: yachtInfo.additionalInfo,
          checkIn: yachtInfo.checkIn,
          checkOut: yachtInfo.checkOut,
          maxGuests: yachtInfo.maxGuests,
          price: yachtInfo.price,
        });
        return res.status(200).json({ message: "yacht saved!" });
      })
      .catch((err) =>
        res.status(400).json({ message: "you must be signed in" })
      );
  },
  update: async (req, res) => {
    console.log(req.body.price);
    const {
      _id,
      owner,
      title,
      address,
      photos,
      description,
      amenities,
      additionalInfo,
      checkIn,
      checkOut,
      maxGuests,
      price,
    } = req.body;
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await Yacht.findById(_id).then((yachtData) => {
      if (
        String(yachtData._id) === _id &&
        String(yachtData.owner) === String(decoded.id)
      ) {
        Yacht.findByIdAndUpdate(
          yachtData._id,
          {
            title,
            address,
            photos,
            description,
            amenities,
            additionalInfo,
            checkIn,
            checkOut,
            maxGuests,
            price,
          },
          {
            new: true,
            runValidators: true,
          }
        )
          .then((updatedYacht) => res.json(updatedYacht))
          .catch((err) => res.status(400).json(err));
      }
    });
  },
  userYachts: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await Yacht.find({ owner: decoded.id })
      .then((userYachts) => {
        res.status(200).json(userYachts);
      })
      .catch((err) =>
        res.status(400).json({ message: "you must be signed in" })
      );
  },
  getYacht: async (req, res) => {
    await Yacht.find({ _id: req.params.yacht_id })
      .then((userYacht) => {
        res.status(200).json(userYacht);
      })
      .catch((err) =>
        res.status(400).json({ message: "you must be signed in" })
      );
  },
  getAll: async (req, res) => {
    await Yacht.find()
      .then((yachts) => res.status(200).json(yachts))
      .catch((err) =>
        res.status(400).json({ message: "could not pull yachts" })
      );
  },
};
