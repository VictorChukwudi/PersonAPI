const mongoose = require("mongoose");
const schema = mongoose.Schema;
const personSchema = schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
