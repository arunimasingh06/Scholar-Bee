// models/Scholarship.js
const mongoose = require("mongoose");

const scholarshipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  eligibilityCriteria: String,
  category: [String],
  amountPerStudent: { 
    type: Number, 
    required: true
 },
  numberOfAwards: { 
    type: Number, 
    required: true
  },
  deadline: { 
    type: Date, 
    required: true
  },
  bannerUrl: String,
  sponsorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  status: {
    type: String,
    enum: ["open", "closed"],
    default: "open"
  }
}, { timestamps: true });

module.exports = mongoose.model("Scholarship", scholarshipSchema);
