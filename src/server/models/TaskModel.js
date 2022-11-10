const { Pool } = require('pg');
import myPrivateURI from '../../../myPrivateURI.js';

// v-- REPLACE THE EMPTY STRING WITH LOCAL/MLAB/ELEPHANTSQL URI
const myURI = myPrivateURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

const pool = new Pool({
  connectionString: URI,
});

const taskModel = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};

export default taskModel;