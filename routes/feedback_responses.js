const Router = require('express-promise-router');

const feedback_db = require('../data/feedback');
const router = new Router();

/* GET home page. */
router.get('/', function(req, response, next) {
  feedback_db.GetAllFeedback()
    .then(result => { console.log(result.rows); return result.rows; })
    .then(rows => response.send(rows))
    .catch(err => console.error("Error: " + err.stack));
});

module.exports = router;
