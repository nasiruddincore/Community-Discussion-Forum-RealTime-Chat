const express = require('express');
const router = express.Router();
const { createDiscussion, getDiscussions } = require('../controllers/discussionController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .get(getDiscussions)
  .post(protect, createDiscussion);

module.exports = router;