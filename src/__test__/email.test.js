var request = require("supertest");
var app = require("../server");

describe("send email",  () => {
  it("should successfully send email", async () => {
    var res = await request(app).post("/email").send({
      to: "susan@testmail.com",
      to_name: "Miss Susan",
      from: "noreply@test.com",
      from_name: "brightwheel",
      subject: "Your Weekly Report",
      body: "<h1>Weekly Report</h1><p>You saved 10 hours thisweek!</p>",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });

  it("should fail send email", async () => {
    var res = await request(app).post("/email").send({
      to: "susan@testmail.com",
      to_name: "Miss Susan",
      from: "noreply@test.com",
      from_name: "brightwheel",
      subject: "Your Weekly Report",
      body: "<h1>Weekly Report</h1><p>You saved 10 hours thisweek!</p>",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
