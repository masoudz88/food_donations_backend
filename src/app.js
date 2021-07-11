const { response } = require("express");
const express = require("express");
const app = express();
const port = 4000;

let bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


let fakeProducts = [
  { id: 1, name: "Meat" },
  { id: 2, name: "Dairy" },
  { id: 3, name: "cooked food" },
  { id: 4, name: "Seafood" },
];


app.get("/products", (req, res) => {
  res.send(fakeProducts);
});
app.get("/companies", (req, res) => {
  res.send(fakeCompanies);
});
app.get("/products/:id", (req, res) => {
  res.send(fakeProducts.find((p) => p.id === +req.params.id));
});
app.post("/products", function (req, res) {
  const newProduct = { ...req.body, id: fakeProducts.length + 1 };
  fakeProducts = [...fakeProducts, newProduct];
  res.send(newProduct);
});
app.put("/products/:id", (req, res) => {
  let updatedProduct;
  fakeProducts = fakeProducts.map((p) => {
    if (p.id === req.body.id) {
      updatedProduct = { ...p, ...req.body };
      return updatedProduct;
    }
    return p;
  });
  res.json(updatedProduct);
});
app.delete("/products/delete/:id", (req, res) => {
  const deletedProduct = fakeProducts.find((p) => p.id === +req.params.id);
  fakeProducts = fakeProducts.filter((p) => p.id === +req.params.id);
  res.send(deletedProduct);
});
app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
