const {Schema, model} = require('mongoose');

const MeetingSchema = Schema({
  concept:  {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: [true, "You need a date in order to reserve a spot"]
  },
  startTime: {
    type: String,
    required: [true, 'A starting time is required']
  },
  attendees: {
    type: [Schema.Types.ObjectId],
    required: [true, 'At least one attendee has to be registered'],
    ref: 'User'
  },
  duration: {
    type: Number,
    required: true
  }
});

module.exports = model('Spot', MeetingSchema);