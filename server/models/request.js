const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const requestSchema = new mongoose.Schema(
  {
    info: {
      type: ObjectId,
      ref: 'User',
    },
    category: String,
    description: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
