const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const speakers = await speakerService.getList();
    const getImage = await speakerService.getAllArtwork();
    res.render('layout', { pageTitle: 'Speakers', template: 'speakers', speakers, getImage });
  });

  router.get('/:shortname', async (req, res) => {
    const speaker = await speakerService.getSpeaker(req.params.shortname);
    const getImage = await speakerService.getArtworkForSpeaker(req.params.shortname);
    res.render('layout', {
      pageTitle: req.params.shortname,
      template: 'speakers-detail',
      speaker,
      getImage,
    });
  });

  return router;
};
