const Router = require('express-promise-router');

const router = new Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('faq', {title:"Frequently Asked Questions"});
});

module.exports = router;
