const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    clientName: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      default: "New Lead",
    },

    assignedTo: {
      type: String,
      default: "Sales Team",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Lead", leadSchema);