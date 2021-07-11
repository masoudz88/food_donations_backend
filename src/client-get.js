const http = require("http");

http.get({ path: "/products", hostname: "localhost", port: 3000 }, (res) => {
  let body = JSON.stringify([
    { id: 1, name: "Meat" },
    { id: 2, name: "Dairy" },
    { id: 3, name: "cooked food" },
    { id: 4, name: "Seafood" },
  ]);
  res.on("data", (chunk) => {
    body += "" + chunk;
  });
  res.on("end", () => {
    console.log("Received data", body);
  });
  res.on("close", () => {
    console.log("Connection closed");
  });
});
