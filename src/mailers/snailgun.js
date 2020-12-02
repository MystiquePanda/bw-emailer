var fetch = require("node-fetch");

module.exports = {
  send: async (msg) => {
    //console.log("sending with snailgun");
    const body = {
      from_email: msg.from,
      from_name: msg.from_name,
      to_email: msg.to,
      to_name: msg.to_name,
      subject: msg.subject,
      body: msg.body,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": process.env.SNAILGUN_APIKEY,
      },
      body: JSON.stringify(body),
    };

    return await fetch(process.env.SNAILGUN_SEND_URL, options)
      .then((r) => {
        if (r.ok) {
          return r.json();
        }
        throw new Error(r.statusCode);
      })
      .then(async (r) => {
        if (r.status === "failed") return false;
        //pool until fail or timeout
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Api-Key": process.env.SNAILGUN_APIKEY,
          },
        };

        let res;
        do {
          res = await fetch(
            process.env.SNAILGUN_SEND_URL + "/" + r.id,
            options
          )
            .then((r) => {
              if (r.ok) return r.json();
              throw new Error(r.statusCode);
            })
            .then((r) => {
              //console.log(r);
              return r.status;
            })
            .catch((r) => {
              return "failed";
            });
            //TODO SLEEP
            setTimeout(()=>{},1000)

        } while (res !== "failed" && res !== "sent");
        //TODO incorporate timeout
        return res === "sent";
      })
      .catch((r) => {
        return false;
      });
  },
};
