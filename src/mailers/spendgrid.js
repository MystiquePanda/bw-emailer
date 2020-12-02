const fetch = require("node-fetch");

module.exports = {
  send: async (msg) => {
    console.log("sending with spendgrid");
    const body = {
      sender: `${msg.from_name} <${msg.from}>`,
      recipient: `${msg.to_name} <${msg.to}>`,
      subject: msg.subject,
      body: msg.body,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.SPENDGRID_APIKEY,
      },
      body: JSON.stringify(body),
    };

    //console.log(options);
    const s = await fetch(process.env.SPENDGRID_SEND_URL, options).then((r) => {
      if (r.ok) {
        return true;
      }
      return false;
    });
    return s;
  },
};
