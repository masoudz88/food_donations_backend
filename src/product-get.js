const http = require("http");

http.get(
  { path: "/api/products", hostname: "localhost", port: 4000 },
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
