const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!')
});

const fakeProducts = [
    { id: 1, product: 'Meat' },
    { id: 2, product: 'Dairy' },
    { id: 3, product: 'cooked food' },    
    { id: 4, product: 'Seafood' },
];

app.get('/products', (req, res) => {
    res.send(JSON.stringify(fakeProducts));
});

app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`)
});
