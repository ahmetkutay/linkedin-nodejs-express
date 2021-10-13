const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res, next) => {
    try {
      const speakers = await speakerService.getList();
      const getImage = await speakerService.getAllArtwork();
      return res.render('layout', {
        pageTitle: 'Speakers',
        template: 'speakers',
        speakers,
        getImage,
      });
    } catch (err) {
      return next(err);
    }
  });

  router.get('/:shortname', async (req, res, next) => {
    try {
      const speaker = await speakerService.getSpeaker(req.params.shortname);
      const getImage = await speakerService.getArtworkForSpeaker(req.params.shortname);
      return res.render('layout', {
        pageTitle: req.params.shortname,
        template: 'speakers-detail',
        speaker,
        getImage,
      });
    } catch (error) {
      return next(error);
    }
  });

  return router;
};
