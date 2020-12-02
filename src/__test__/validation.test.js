const mailer = require("../routes/emailRoute");
/*● to The email address to send to
● to_name The name to accompany the email
● from The email address in the from and reply fields
● from_name the name to accompany the from/reply emails
● subject The subject line of the email
● body the HTML body of the email */

describe("validate inputs", () => {
  it("validates email", () => {
    expect(mailer.validateEmail("susan@testmail.com")).toEqual(true);
    expect(mailer.validateEmail("susan@.com")).toEqual(false);
    expect(mailer.validateEmail("susantestmail.com")).toEqual(false);
    expect(mailer.validateEmail("susan.testmail@com")).toEqual(false);
  });

  it("validate email req body", () => {
    const g = {
      to: "susan@testmail.com",
      to_name: "Miss Susan",
      from: "noreply@test.com",
      from_name: "brightwheel",
      subject: "Your Weekly Report",
      body: "<h1>Weekly Report</h1><p>You saved 10 hours thisweek!</p>",
    };
    expect(mailer.validateEmailReq(g)).toEqual(true);
  });

  it("fail validation email req bodyreq", () => {
    const b = {
      to: "susan@testmail.com",
      to_name: "Miss Susan",
      from: "noreply@test.com",
      from_name: "brightwheel",
      body: "<h1>Weekly Report</h1><p>You saved 10 hours thisweek!</p>",
    };
    expect(mailer.validateEmailReq(b)).toHaveProperty("error");
  });

  it("fail validation email req bodyreq", () => {
    const b = {
      to: "susan@testmail.com",
      to_name: "Miss Susan",
      from: "noreply@test.com",
      from_name: "brightwheel",
      subject: "blah",
    };
    expect(mailer.validateEmailReq(b)).toHaveProperty("error");
  });
});
