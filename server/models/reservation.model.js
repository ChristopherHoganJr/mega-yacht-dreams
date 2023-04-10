const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReservationSchema = new Schema({
  yacht: { type: Schema.Types.ObjectId, ref: "Yacht", required: true },
  checkIn: { type: Date, required: true },
  checkOut: { type: Date, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  phone: { type: String, required: true },
  price: { type: Number, required: true },
});

const Reservation = mongoose.model("Reservation", ReservationSchema);
module.exports = Reservation;
