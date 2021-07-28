const http = require("http");

http.get(
  { path: "/api/companies", hostname: "localhost", port: 4000 },
  (res) => {
    let body = "";
    res.on("data", (chunk) => {
      body += "" + chunk;
    });
    res.on("end", () => {
      console.log("Received data", body);
    });
    res.on("close", () => {
      console.log("Connection closed");
    });
  }
);
