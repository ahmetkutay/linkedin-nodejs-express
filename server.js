const express = require('express');

const app = express();
const path = require('path');
const cookieSession = require('cookie-session');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const routes = require('./route');

const PORT = 8000;
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['asdasdadasd', 'zxczxczxczxc'],
  })
);

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
app.locals.siteName = 'Roux Meetup';
app.use(express.static(path.join(__dirname, './static')));

app.use(async (req, res, next) => {
  try {
    const names = await speakerService.getNames();
    res.locals.speakerNames = names;
    return next();
  } catch (err) {
    console.log(err);
  }
});

app.use('/', routes({ feedbackService, speakerService }));

app.use((req, res, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, req, res, next) => {
  res.locals.message = err.message;
  console.error(err);
  const status = err.status || 500;
  res.locals.status = status;
  res.status(status);
  res.render('error');
});

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
