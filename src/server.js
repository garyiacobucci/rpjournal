import express from 'express';
import path from 'path';

const { taskController } = require('./controllers/taskController');
const app = express();
const PORT = 5555;
 
app.use(express.json());

// ROUTE HANDLER DEFINITIONS:

// Handle requests for the static files (Setting headers
// will be handled by Express automatically):
app.use(express.static( path.join( __dirname, '../assets/') ));
 
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

// Route handler to respond with main app:
app.get('/', function (req, res) {
  res.sendFile(path.resolve( __dirname, '../views/index.html/'));
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
 
// Start server:
app.listen(PORT, () => {
    console.log(`App is listening for requests on port ${PORT}`);
});