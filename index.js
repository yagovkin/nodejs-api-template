const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const helmet = require('helmet');
const config = require('config');
const morgan = require('morgan');
const express = require('express');
const genres = require('./routes/genres');
const web = require('./routes/web');

const app = express();
const logger = require('./middleware/logger');

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(logger);
app.use(helmet());
app.use('/api/genres', genres);
app.use('/web', web);

// Configuration
// export app_password=12345
// export DEBUG=app:startup,app:db
// export DEBUG=app:*
startupDebugger(`App Name: ${config.get('name')}`);
dbDebugger(`App Password: ${config.get('mail.password')}`);

// Set env variable: export NODE_ENV=production
if (app.get('env') === 'development') {
  app.use(morgan('tiny'));
}

const port = process.env.PORT || 3000;
app.listen(port, () => startupDebugger(`Listening on port ${port}...`));
