const express = require('express');
const router = express.Router();

module.exports = (params) => {
  const { speakerService } = params;

  router.get('/', async (req, res) => {
    const speaker = await speakerService.getList();
    return res.json(speaker);
  });
  router.get('/:shortname', (req, res) => {
    return res.send(`Detail page of ${req.params.shortname}`);
  });

  return router;
};
