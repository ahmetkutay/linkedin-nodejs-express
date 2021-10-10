const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { feedbackService } = params;
  router.get('/', (req, res) => {
    const feedback = feedbackService.getList();
    return res.json(feedback);
  });
  router.post('/', (req, res) => {
    return res.send(`Feedback form poster`);
  });

  return router;
};
