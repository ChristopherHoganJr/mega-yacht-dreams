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
        });
        return res.status(200).json({ message: "yacht saved!" });
      })
      .catch((err) =>
        res.status(400).json({ message: "you must be signed in" })
      );
  },
  update: async (req, res) => {
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
  userYacht: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await Yacht.find({ owner: decoded.id, _id: req.params.yacht_id })
      .then((userYacht) => {
        res.status(200).json(userYacht);
      })
      .catch((err) =>
        res.status(400).json({ message: "you must be signed in" })
      );
  },
};
