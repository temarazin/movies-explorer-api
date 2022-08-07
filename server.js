const app = require('./app');
const { commonSettings } = require('./utils/settings');

const { PORT } = process.env;

app.listen(PORT || commonSettings.defaultPort);
