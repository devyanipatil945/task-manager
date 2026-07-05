const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },

    completed: {
      type: Boolean,
      default: false,
    },

    priority: {
      type: String,
      default: "Medium",
    },

    dueDate: {
      type: String,
    },

    category: {
      type: String,
      default: "Work",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);