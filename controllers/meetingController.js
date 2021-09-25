const Meeting = require("../models/Meeting");
const Spot = require("../models/Meeting");
const User = require("../models/User");

// GET/meeting
exports.getAllMeetings = async (req, res) => {
  const meetings = await Meeting.find().populate("attendees");
  try {
    const  authUser = req.user;
    return res.status(200).json(meetings);
    // return res.status(200).json({meetings, authUser});
  } catch (error) {
    return res.status(500).json({message: "Could not get the meetings"})
  }
}


// GET/meeting/Id
exports.getMeetingById = async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findById(id);
  try {
    return res.status(200).json(meeting);
  } catch (error) {
    return res.status(400).json({message: "Meeting not found"})
  }
}

// POST/meeting
exports.createMeeting = async (req, res) => {
  const meeting = await Meeting.create(req.body);
  try {
    return res.status(201).json(meeting);
  } catch (error) {
    return res.status(500).json({message: "Couldn't create the meeting"});
  }
}

// PUT/meeting/Id
exports.updateMeeting = async (req, res) => {
  const { id } = req.params;
  const meeting = await Meeting.findByIdAndUpdate(id, req.body, {new: true});
  try {
    return res.status(202).json(meeting);
  } catch (error) {
    return res.status(500).json({message: "Couldn't update the meeting"});
  }
}

// DELETE/meeting/Id
exports.deleteMeeting = async (req, res) => {
  const {id} = req.params;
  await Meeting.findByIdAndDelete(id);
  try {
    return res.status(203).json({message: "succesfully deleted meeting"});
  } catch (error) {
    return res.status(500).json({message: "Couldn't delete the meeting"})
  }
}