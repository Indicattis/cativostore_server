const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
app.use(express.json());
app.use(cors());


const port = 9002

app.get('/', (req, res) =>{
    return res.json(`CATIVOSTORE_SERVER is on port:${port}`);
});

app.get('/products', (req, res) => {
    const sql = `SELECT * FROM products`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Não foi possível consultar os produtos" });
        return res.json(result);
    });
})


app.listen(port, () => {
    console.log("Server is running on port "+ port)
})

module.exports = app;