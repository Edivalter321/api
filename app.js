import express from "express";
import mysql from "mysql2"
const app = express();
const PORT = 666;

app.use(express.json());

const connection = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'dripstore',
});
// Produtos
connection.connect((error) => {
    if(error){
        console.log("Conexão com o banco de dados não foi feita")
    } else {
        console.log("Conexão com o banco de dados efetuado com sucesso")
    }
})
 app.get('/produtos', (req,res) => {
    connection.query("SELECT * FROM tb_produtos", (error,results) => {
    try {
        res.send(results).status(200)

    } catch {
        res.send("Error ao buscar produtos").status(500)
    }

    })
 })

 app.get('/produtos/:id', (req,res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM tb_produtos WHERE id = ${id} `, (error, results) => {

        try {
            res.send(results).status(200)
        } catch {
            res.send({message:"Error ao buscar produtos"}).status(500)
        }

    })

})

app.delete('/produtos/:id', (req,res) => {
    const id = req.params.id
    connection.query(`DELETE FROM tb_produtos WHERE id = ${id}`, (error,results) => {
        try {
            res.send(results).status(204)
        } catch {
            res.send("Error ao deletar produtos").status(500)
        }
    })
})

app.post('/produtos', (req,res) => {
    const {cor,tamanho,categorias_id,preco,estoque,num_serial,promocao_id} = req.body.produtos;
    const query = "INSERT INTO tb_produtos (cor,tamanho,categorias_id,preco,estoque,num_serial,promocao_id) VALUES (?, ?, ?, ?, ?, ?, ?)";
    const values = [cor,tamanho,categorias_id,preco,estoque,num_serial,promocao_id];

    try {
        connection.query(query, values, (err, results) => {
        res.status(201).send('Produto adicionado com sucesso');
        })
        
    } catch {
        console.error('Erro ao adicionar produto:', err);
        res.status(500).send('Error ao adicionar produto');
    }

    })

app.put('/produtos/:id', (req,res) => {
    const id = req.params.id;
    const {cor,tamanho,categorias_id,preco,estoque,num_serial,promocao_id} = req.body.produtos;
    const query = " UPDATE tb_produtos SET cor = ?,tamanho = ?,categorias_id = ?, preco = ?, estoque = ?, num_serial = ?, promocao_id = ? WHERE id = ?";
    const values = [cor,tamanho,categorias_id,preco,estoque,num_serial,promocao_id,id]; 

    try {
        connection.query(query, values, (err, results) => {
        res.status(201).send('Produto atualizado com sucesso');
        })
        
    } catch {
        res.status(500).send('Error ao atualizar produto');
    }
})

// Usuarios
connection.connect((error) => {
    if(error){
        console.log("Conexão com o banco de dados não foi feita")
    } else {
        console.log("Conexão com o banco de dados efetuado com sucesso")
    }
})
 app.get('/usuarios', (req,res) => {
    connection.query("SELECT * FROM tb_usuarios", (error,results) => {
    try {
        res.send(results).status(200)

    } catch {
        res.send("Error ao buscar usuarios").status(500)
    }

    })
 })

 app.get('/usuarios/:id', (req,res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM tb_usuarios WHERE id = ${id} `, (error, results) => {

        try {
            res.send(results).status(200)
        } catch {
            res.send({message:"Error ao buscar usuarios"}).status(500)
        }

    })

})

app.delete('/usuarios/:id', (req,res) => {
    const id = req.params.id
    connection.query(`DELETE FROM tb_usuarios WHERE id = ${id}`, (error,results) => {
        try {
            res.send(results).status(204)
        } catch {
            res.send("Error ao deletar usuario").status(500)
        }
    })
})

app.post('/usuarios', (req,res) => {
    const {nome,cpf,email,telefone,senha} = req.body.usuarios;
    const query = "INSERT INTO tb_usuarios (nome,cpf,email,telefone,senha) VALUES (?, ?, ?, ?, ?)";
    const values = [nome,cpf,email,telefone,senha];

    try {
        connection.query(query, values, (err, results) => {
        res.status(201).send('Usuario adicionado com sucesso');
        })
        
    } catch {
        console.error('Erro ao adicionar usuario:', err);
        res.status(500).send('Error ao adicionar usuario');
    }

    })

app.put('/usuarios/:id', (req,res) => {
    const id = req.params.id;
    const {nome,cpf,email,telefone,senha} = req.body.usuarios;
    const query = " UPDATE tb_usuarios SET nome = ?,cpf = ?,email = ?, telefone = ?, senha = ? WHERE id = ?";
    const values = [nome,cpf,email,telefone,senha,id]; 

    try {
        connection.query(query, values, (err, results) => {
        res.status(201).send('Usuario atualizado com sucesso');
        })
        
    } catch {
        res.status(500).send('Error ao atualizar usuario');
    }
})


// Pedidos

 app.listen(PORT,() => {
    console.log(`Aplicação rodando na porta ${PORT}`)
 })