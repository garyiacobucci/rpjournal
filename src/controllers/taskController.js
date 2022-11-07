const db = require('../models/TaskModel.js');

const taskController = {};

// Function postEntry should create a new item in the database.
taskController.postEntry = (req, res, next) => {
  //const { item, created_at } = req.body;
  //const queryStr = 'INSERT INTO ENTRIES (item, created_at) VALUES ($1, $2)';
  const queryStr = `INSERT INTO ENTRIES (Text) VALUES ('Today I went to the market.');`
  //db.query(queryStr, [item, created_at])
  db.query(queryStr)
    .then((data) => {
      //console.log(data);
      return next();
    })
    .catch((err) => {
      console.log(`Error in taskController.postEntry: ${err}...`);
      return next(err);
    });
};

// Function getEntries should retrieve all items from the database 
// and send it back to the client as JSON.
taskController.getEntries = (req, res, next) => {
  const queryStr = 'SELECT * FROM "public"."entries" LIMIT 100';

  db.query(queryStr)
    .then((data) => {
      res.locals.data = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught exception in taskController.getEntries',
        status: 400,
        message: { err },
      });
    });
};

// Function deleteTask should find items in the database based 
// on an ID number and delete that item if it exists.
taskController.deleteEntry = (req, res, next) => {
  // Get _id number from request:
  const { _id } = req.body;
  const queryStr = 'DELETE FROM "entries" WHERE _id = 3';
  //db.query(queryStr, [_id])
  db.query(queryStr)
    .then((data) => {
      //console.log(data);
      return next();
    })
    .catch((err) => {
      return next({
        log: 'Express error handler caught exception in taskController.deleteEntry',
        status: 400,
        message: { err },
      });
    });
};


module.exports = { taskController };