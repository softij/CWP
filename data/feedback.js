const { Pool } = require('pg');

var connInfo = {
  connectionString: process.env.DATABASE_URL+"?ssl=true",
};

const pool = new Pool(connInfo);

function AddFeedback(feedbackText, contact) {
  return pool.query(
    'INSERT INTO FeedbackResponses (receivedTime, feedbackText, contact) VALUES (CURRENT_TIMESTAMP, $1, $2)',
    [feedbackText, contact]
  );
}

function GetAllFeedback() {
  return pool.query('SELECT * FROM FeedbackResponses')
}

module.exports = {
  GetAllFeedback: GetAllFeedback,
  AddFeedback: AddFeedback
};
