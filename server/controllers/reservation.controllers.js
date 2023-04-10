const Reservation = require("../models/reservation.model");
const Yacht = require("../models/yacht.model");
const User = require("../models/user.model");

const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = {
  new: async (req, res) => {
    let reservationInfo = req.body;

    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await User.findById(decoded.id)
      .then((user) => {
        Yacht.findById(req.params.yacht_id)
          .then((yacht) => {
            Reservation.create({
              yacht: yacht._id,
              checkIn: reservationInfo.checkIn,
              checkOut: reservationInfo.checkOut,
              user: user._id,
              phone: reservationInfo.phone,
              price: reservationInfo.price,
            })
              .then((reservation) => res.status(200).json(reservation))
              .catch((err) =>
                res
                  .status(400)
                  .json({ message: "Unable to post reserveration" })
              );
          })
          .catch((err) =>
            res.status(400).json({ message: "Unable to find yacht" })
          );
      })
      .catch((err) => res.status(400).json({ message: "Please log in" }));
  },
  getReservation: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await User.findById(decoded.id)
      .then((user) => {
        Reservation.findById(req.params.reservation_id)
          .populate({ path: "yacht", populate: "owner" })
          .then((reservation) => res.status(200).json(reservation))
          .catch((err) =>
            res.status(400).json({ message: "did not find reservation" })
          );
      })
      .catch((err) =>
        res.status(400).json({ message: "you need to log in first" })
      );
  },
  getUserReservations: async (req, res) => {
    let decoded = jwt.verify(req.cookies.usertoken, process.env.SECRET_KEY);
    await User.findById(decoded.id)
      .then((user) => {
        Reservation.find({ user: user._id })
          .populate({ path: "yacht", populate: "owner" })
          .then((reservations) => res.status(200).json(reservations))
          .catch((err) =>
            res.status(400).json({ message: "could not pull reservations" })
          );
      })
      .catch((err) => res.status(400).json({ message: "please log in" }));
  },
};
