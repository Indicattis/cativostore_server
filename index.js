const express = require('express');
const cors = require('cors');
const db = require('./db.js');

const app = express();
app.use(express.json());
app.use(cors());


const port = 9001

app.get('/', (req, res) =>{
    return res.json(`CATIVOSTORE_SERVER is on port:${port}`);
});

app.get('/products', (req, res) => {
    const sql = `SELECT * FROM CSD_PRODUCTS`;
    db.query(sql, (err, result) => {
        if (err) return res.json({ Message: "Não foi possível consultar os produtos" });
        return res.json(result);
    });
})
app.get('/product/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM CSD_PRODUCTS WHERE id = ?`;
    
    db.query(sql, [id], (err, result) => {
        if (err) return res.json({ Message: "Não foi possível consultar o produto" });
        return res.json(result);
    });
});

app.put('/product_update/:id', (req, res) => {
    const id = req.params.id;
    const { title, description, price, offer, status } = req.body;

    const sqlUpdate = `UPDATE CSD_PRODUCTS
                       SET prod_name = ?, 
                       prod_description = ?, 
                       prod_price = ?, 
                       prod_offer = ?, 
                       prod_status = ?,
                       prod_stock = 1
                       WHERE id = ?`;

    db.query(sqlUpdate, [title, description, price, offer, status, id], (err, result) => {
        if (err) {
            console.error("Erro ao atualizar produto:", err);
            return res.status(500).json({ error: "Erro ao atualizar produto" });
        }

        return res.json({ message: "Produto atualizado com sucesso!" });
    });
});

app.post('/product_insert', (req, res) => {
    const { title, description, price, offer, status } = req.body;

    const sql = `INSERT INTO CSD_PRODUCTS (
                prod_name, 
                prod_description, 
                prod_price, 
                prod_offer, 
                prod_status,
                prod_stock)
                VALUES (?, ?, ?, ?, ?)`;

    db.query(sql, [title, description, price, offer, status], (err, result) => {
        if (err) {
            console.error("Erro ao cadastrar produto:", err);
            return res.status(500).json({ error: "Erro ao cadastrar produto" });
        }

        return res.json({ message: "Produto cadastrado com sucesso!" });
    });
});

app.post('/product_delete/:id', (req, res) => {
    const id = req.params.id;

    const sql = `DELETE FROM CSD_PRODUCTS WHERE id = ?`;

    db.query(sql, [id], (err, result) => {
        if (err) {
            console.error("Erro ao deletar produto:", err);
            return res.status(500).json({ error: "Erro ao deletar produto" });
        }

        return res.json({ message: "Produto deletado com sucesso!" });
    });
});

app.listen(port, () => {
    console.log("Server is running on port "+ port)
})

module.exports = app;