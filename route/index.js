const express = require('express');
const router = express.Router();
const speakerRoutes = require('./speaker');
const feedbackRoutes = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const topSpeakers = await speakerService.getList();
    res.render('layout', { pageTitle: 'Welcome', template: 'index', topSpeakers });
  });

  router.use('/speaker', speakerRoutes(params));
  router.use('/feedback', feedbackRoutes(params));
  return router;
};
