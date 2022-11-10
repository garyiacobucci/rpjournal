import path from 'path'
import express from 'express'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import config from '../../webpack.dev.config.js'
import taskController from './controllers/taskController';

const app = express(),
            DIST_DIR = __dirname,
            HTML_FILE = path.join(DIST_DIR, 'index.html'),
            compiler = webpack(config)

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath
}))

app.use(webpackHotMiddleware(compiler))

// Route for checking server response: 
app.get('/health', (req, res) => {
  return res.status(200).send({message: "Health is good"});
});

// Route handler for retrieving entries:
app.get('/getEntries', taskController.getEntries, (req, res) => {
  res.status(200).json([res.locals.data.rows]);
});

// Route handler for adding entries:
app.use('/postEntry', taskController.postEntry, (req, res) => {
  res.status(200).json();
  return;
});

// Route handler for deleting tasks:
app.use('/deleteEntry', taskController.deleteEntry, (req, res) => {
  res.status(200).json();
  return; 
});

// Catch-all route handler for any requests to an unknown route:
app.use(function (req, res) {
  res.status(404).send('Sorry can\'t find that!');
});

// Global error handler:
app.use(function(err, req, res, next) {
  // create Error object template
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' }, 
  };

  // create error object, errObj
  const errorObj = Object.assign(defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.get('*', (req, res, next) => {
  compiler.outputFileSystem.readFile(HTML_FILE, (err, result) => {
  if (err) {
    return next(err)
  }
  res.set('content-type', 'text/html')
  res.send(result)
  res.end()
  })
})

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`App listening to ${PORT}....`)
    console.log('Press Ctrl+C to quit.')
})
