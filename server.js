const express = require('express');
const app = express();
const path = require('path');
const routes = require('./route');
const PORT = 8000;
const FeedbackService = require('./services/FeedbackService');
const SpeakerService = require('./services/SpeakerService');
const cookieSession = require('cookie-session');

const feedbackService = new FeedbackService('./data/feedback.json');
const speakerService = new SpeakerService('./data/speakers.json');

app.set('trust proxy', 1);
app.use(
  cookieSession({
    name: 'session',
    keys: ['asdasdadasd', 'zxczxczxczxc'],
  })
);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use(express.static(path.join(__dirname, './static')));
app.use('/', routes({ feedbackService, speakerService }));

app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
