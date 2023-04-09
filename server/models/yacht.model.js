const mongoose = require("mongoose");
const { Schema } = mongoose;

const YachtSchema = new Schema({
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  address: String,
  photos: [String],
  description: String,
  amenities: [String],
  additionalInfo: String,
  checkIn: String,
  checkOut: String,
  maxGuests: Number,
  price: Number,
});

const Yacht = mongoose.model("Yacht", YachtSchema);
module.exports = Yacht;
