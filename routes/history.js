const Router = require('express-promise-router');

const router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('history', {title: "Cannon History"});
});

module.exports = router;
