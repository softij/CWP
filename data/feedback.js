const { Pool } = require('pg');

var connInfo = {
  connectionString: process.env.DATABASE_URL+"?ssl=true",
};

const pool = new Pool(connInfo);

function AddFeedback(feedbackText, contactEmail, contactName) {
  return pool.query(
    'INSERT INTO FeedbackResponses (receivedTime, feedbackText, contactEmail, contactName) VALUES (CURRENT_TIMESTAMP, $1, $2, $3)',
    [feedbackText, contactEmail, contactName]
  );
}

function GetAllFeedback() {
  return pool.query('SELECT * FROM FeedbackResponses')
}

module.exports = {
  GetAllFeedback: GetAllFeedback,
  AddFeedback: AddFeedback
};
