const http = require("http");

const companyToDelete = {
  id: 1,
};
const data = JSON.stringify(companyToDelete);

const options = {
  hostname: "localhost",
  port: 4000,
  path: `/api/companies/${companyToDelete.id}`,
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const request = http.request(options, (res) => {
  let body = "";
  res.on("data", (chunk) => {
    body += "" + chunk;
  });
  res.on("error", (err) => console.error("err", err));
  res.on("end", () => {
    console.log("response", body);
  });
  res.on("close", () => {
    console.log("Closed connection");
  });
});

request.end(data);
