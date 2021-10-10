const express = require('express');
const router = express.Router();
const speakerRoutes = require('./speaker');
const feedbackRoutes = require('./feedback');

module.exports = (params) => {
  router.get('/', (req, res) => {
    res.render('pages/index', { pageTitle: 'Welcome' });
  });

  router.use('/speaker', speakerRoutes(params));
  router.use('/feedback', feedbackRoutes(params));
  return router;
};
