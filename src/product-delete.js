const http = require("http");

const id = 1;

const options = {
  hostname: "localhost",
  port: 4000,
  path: `/api/products/${id}`,
  method: "DELETE",
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

request.end();
