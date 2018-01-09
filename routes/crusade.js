const Router = require('express-promise-router');

const router = new Router();

/* GET crusade page. */
router.get('/', function(req, res, next) {
  res.render('crusade', {title: "Crusade"});
});

module.exports = router;
