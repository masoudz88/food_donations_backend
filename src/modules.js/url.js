const url = require("url");
const myUrl = new URL(
  "http://wastemanagement.com/hello.tx?id=1000&status=active"
);

console.log(myUrl.href);
console.log(myUrl.host);
console.log(myUrl.hostname);
console.log(myUrl.pathname);
console.log(myUrl.search);
