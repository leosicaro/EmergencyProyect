const express = require('express')
const App = express()
const mysql = require('mysql')
const cors = require("cors")


App.use(cors())
App.use(express.json())

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"gluglu23",
    database:"usuarios"
})

App.post("/create",(req,res)=>{
    const nombre= req.body.nombre;
    const edad= req.body.edad;
    const pais= req.body.pais;
    const cargo= req.body.cargo;
    const antiguedad= req.body.antiguedad;

    db.query('INSERT INTO usuarios(nombre,edad,pais,cargo,antiguedad) VALUES (?,?,?,?,?)',[nombre,edad,pais,cargo,antiguedad],
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send("usuario registrado")
    }
}
)
})
App.get("/usuarios",(req,res)=>{



    db.query('SELECT * FROM usuarios',
(err,result)=>{
    if(err){
        console.log(err)
    }else{
        res.send(result)
    }
}
)
})


App.listen(3000,()=>{
    console.log("listen in port 3000")
})