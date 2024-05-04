
import { useState } from 'react'
import Axios from "axios"
import './App.css'

function App() {
  const [nombre, setnombre] = useState('')
  const [edad, setEdad] = useState(0)
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [antiguedad, setAntiguedad] = useState(0)

  const [usuariosList, setUsuariosList] = useState([])


  const add = () => {
    Axios.post("http://localhost:3000/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      alert("empleado Creado")
    })
  }
  const getUsuarios = () => {
    Axios.get("http://localhost:3000/usuarios").then((response) => {
      setUsuariosList(response.data)
    })
  }
  getUsuarios()

  return (
    <>
      <div className="App">
        <div className="datos">
          <label>Nombre: <input type="text" onChange={(e) => { setnombre(e.target.value) }} /></label><br />
          <label>Edad: <input type="number" onChange={(e) => { setEdad(e.target.value) }} /></label><br />
          <label>Pais: <input type="text" onChange={(e) => { setPais(e.target.value) }} /></label><br />
          <label>Cargo: <input type="text" onChange={(e) => { setCargo(e.target.value) }} /></label><br />
          <label>Antiguedad: <input type="number" onChange={(e) => { setAntiguedad(e.target.value) }} /></label><br />
          <button onClick={add}>Registrar</button>
        </div>
        <div className="lista">
          
          {
            usuariosList.map((val, key) => {
              return <div className="nombre">{val.nombre}</div>
            })
          }
        </div>
      </div>
    </>
  )
}

export default App
