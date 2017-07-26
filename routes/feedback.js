const Router = require('express-promise-router');

const feedback_db = require('../data/feedback');
const router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  feedback_db.GetAllFeedback()
    .then(res => console.log(res.rows))
    .catch(err => console.error("Error: " + err.stack));

  res.render('feedback', {title:"Cannon Feedback"});
});

router.post('/', async function(req, res) {
  feedback_db.AddFeedback(
    req.body.feedbackText,
    req.body.contact
  );
  res.render('feedback', {title:"Cannon Feedback"});
});

module.exports = router;
