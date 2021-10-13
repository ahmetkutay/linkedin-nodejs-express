const express = require('express');
const router = express.Router();
const speakerRoutes = require('./speaker');
const feedbackRoutes = require('./feedback');

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const topSpeakers = await speakerService.getList();
      const getImage = await speakerService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Welcome',
        template: 'index',
        topSpeakers,
        getImage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.use('/speaker', speakerRoutes(params));
  router.use('/feedback', feedbackRoutes(params));
  return router;
};
