import express from 'express';

const { taskController } = require('./controllers/taskController');
const app = express();
const PORT = 5555;
 
app.use(express.json());

// ROUTE HANDLER DEFINITIONS:
 
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
 
// Start server:
app.listen(PORT, () => {
    console.log(`App is listening for requests on port ${PORT}`);
});