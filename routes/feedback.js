const Router = require('express-promise-router');

const recaptchaSecret = "6Lc-9y4UAAAAAMl4brGKPni2BBwgh5_5R49Vqhjm";
const https = require("https");
const recaptchaOptions = {
  hostname: "www.google.com",
  port: 443,
  path: "/recaptcha/api/siteverify",
  method: "POST"
};

const sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
const sg_helper = require('sendgrid').mail;
const from_email = new sg_helper.Email('feedback@smokeandthunder.ca');
const to_email = new sg_helper.Email('chief.attiliator@gmail.com');

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
    console.log("Req.Body: %j", req.body);

    var recaptchaData = {
        secret: recaptchaSecret,
        response: req.body["g-recaptcha-response"],
        remoteip: req.ip
    };
        

    var req = https.request(recaptchaOptions, function(res) {
        res.on("data", function(data) {
            console.log("Got data: " + data);
            var json = JSON.parse(data);
            if (json.success === true) {
              feedback_db.AddFeedback(
                req.body.feedbackText,
                req.body.contactEmail,
                req.body.contactName
              );

              // send an email to chief.attiliator@gmail.com
              var contactName = req.body.contactName || "Anonymous";
              var subjectLine = "New Feedback from " + contactName;
              var emailContent = new sg_helper.Content('text/plain', "From: " + contactName + "\n\nEmail: " + req.body.contactEmail + "\n\nMessage:\n" + req.body.feedbackText);
              var mail = new sg_helper.Mail(from_email, subjectLine, to_email, emailContent);

              var request = sg.emptyRequest({
                method: 'POST',
                path: '/v3/mail/send',
                body: mail.toJSON()
              });
              sg.API(request, function(error, response) {
                console.log("Sendgrid Error! Response code " + response.statusCode);
                console.log(response.body);
                console.log(response.headers);
              });

              res.render('feedback', {title:"Cannon Feedback"});
            }
        });
    });
    req.write(recaptchaData);
    req.end();
});

module.exports = router;
