const app = require('./app');
const { commonSettings } = require('./utils/settings');

app.listen(process.env.PORT || commonSettings.defaultPort);
