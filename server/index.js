const express = require('express')
const App = express()
const mysql = require('mysql')
const cors = require("cors")


App.use(cors())
App.use(express.json())

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "gluglu23",
    database: "usuarios"
})

App.post("/create", (req, res) => {
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;

    db.query('INSERT INTO usuarios(nombre,edad,pais,cargo,antiguedad) VALUES (?,?,?,?,?)', [nombre, edad, pais, cargo, antiguedad],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("usuario registrado")
            }
        }
    )
})
App.get("/usuarios", (req, res) => {
    db.query('SELECT * FROM usuarios',
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
                }
            }
        )
    }
)
App.put("/update", (req, res) => {
    const id = req.body.id;
    const nombre = req.body.nombre;
    const edad = req.body.edad;
    const pais = req.body.pais;
    const cargo = req.body.cargo;
    const antiguedad = req.body.antiguedad;
    

    db.query('UPDATE usuarios SET nombre=?, edad=? ,pais=?, cargo=?, antiguedad=? WHERE id=?', [nombre, edad, pais, cargo, antiguedad,id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send("usuario actualizado")
            }
        }
    )
})

App.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    
    

    db.query('DELETE FROM usuarios WHERE id=?', [id],
        (err, result) => {
            if (err) {
                console.log(err)
            } else {
                res.send(result)
            }
        }
    )
})


App.listen(3000, () => {
    console.log("listen in port 3000")
})