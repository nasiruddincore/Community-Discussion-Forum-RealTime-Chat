const Discussion = require('../models/Discussion');

// @desc    Create a new discussion
// @route   POST /api/discussions
const createDiscussion = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const discussion = await Discussion.create({
      title,
      content,
      tags,
      author: req.user.id 
    });
    res.status(201).json(discussion);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all discussions
// @route   GET /api/discussions
const getDiscussions = async (req, res) => {
  try {
    const discussions = await Discussion.find().populate('author', 'username').sort({ createdAt: -1 });
    res.status(200).json(discussions);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createDiscussion, getDiscussions };