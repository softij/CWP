const Router = require('express-promise-router');

const router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('history', {title: "Cannon History"});
});

router.get('/history_book', function(req, res, next) {
  res.render('history_book', { layout: null });
});

module.exports = router;
