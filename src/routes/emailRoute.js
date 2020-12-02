var express = require("express");
var router = express.Router();
var spendgrid = require("../mailers/spendgrid");
var snailgun = require("../mailers/snailgun");
var { htmlToText } = require("html-to-text");

APIS = new Map();
APIS.set("SNAILGUN", snailgun);
APIS.set("SPENDGRID", spendgrid);

validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

plaintextify = (msg) => htmlToText(msg, { wordwrap: 130 });

validateEmailReq = (msg) => {
  if (!"to" in msg || !this.validateEmail(msg.to)) {
    return { error: "Missing or Invalid 'to' email" };
  }
  if (!"from" in msg || !this.validateEmail(msg.from)) {
    return { error: "Missing or Invalid 'from' email" };
  }
  if (!"subject" in msg || !msg.subject) {
    return { error: "Missing Subject" };
  }
  if (!"body" in msg || !msg.body) {
    return { error: "Missing Message body" };
  }

  return true;
};

router.post("/email", async function (req, res, next) {
  if (!APIS.has(process.env.DEFAULT_EMAIL_API)) {
    res
      .status(500)
      .json({ message: `unknown mailer ${process.env.DEFAULT_EMAIL_API}` });
  }
  const validation = validateEmailReq(req.body);
  if (validation.error) {
    //TODO change code
    res.status(500).json({ message: r.error });
  }
  const body = req.body;
  console.log(body);

  //TODO incorporate plaintext
  if (await APIS.get(process.env.DEFAULT_EMAIL_API).send(body)) {
    res.status(200).json({ message: "successful" });
  } else {
    //failed
    res.status(500).json({ message: "error sending email" });
  }
});

exports.validateEmail = validateEmail;
exports.validateEmailReq = validateEmailReq;
exports.router = router;
