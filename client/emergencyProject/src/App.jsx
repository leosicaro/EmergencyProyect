
import { useEffect, useState } from 'react'
import Axios from "axios"
import './App.css'


function App() {
  const [nombre, setNombre] = useState('')
  const [edad, setEdad] = useState(0)
  const [pais, setPais] = useState('')
  const [cargo, setCargo] = useState('')
  const [antiguedad, setAntiguedad] = useState(0)
  const [id, setId] = useState('')

  const [usuariosList, setUsuariosList] = useState([])
  const [editar, setEditar] = useState(false)





  const add = () => {
    Axios.post("http://localhost:3000/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      alert("empleado Creado")
      getUsuarios()
    })
  }
  const getUsuarios = () => {
    Axios.get("http://localhost:3000/usuarios").then((response) => {
      setUsuariosList(response.data)
    })
  }

  const editarUsuario = (val) => {
    setEditar(true)

    setNombre(val.nombre)
    setEdad(val.edad)
    setPais(val.pais)
    setCargo(val.cargo)
    setAntiguedad(val.antiguedad)
    setId(val.id)
  }

  const update = () => {
    Axios.put("http://localhost:3000/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      antiguedad: antiguedad
    }).then(() => {
      getUsuarios()
    })
  }
  const deleteUser = (id) => {
    Axios.delete(`http://localhost:3000/delete/${id}`, {

    }).then(() => {
      getUsuarios()
    })
  }

  const cancelar=()=>{
    setNombre('')
    setEdad('')
    setPais('')
    setCargo('')
    setAntiguedad('')
    setId('')
    setEditar(false)
  }

  useEffect(() => {

    getUsuarios()
  }, [])

  return (
    <>
      <div className="App">
        <div className="datos">
          <label>Nombre: <input value={nombre} type="text" onChange={(e) => { setNombre(e.target.value) }} /></label><br />
          <label>Edad: <input value={edad} type="number" onChange={(e) => { setEdad(e.target.value) }} /></label><br />
          <label>Pais: <input value={pais} type="text" onChange={(e) => { setPais(e.target.value) }} /></label><br />
          <label>Cargo: <input value={cargo} type="text" onChange={(e) => { setCargo(e.target.value) }} /></label><br />
          <label>Antiguedad: <input value={antiguedad} type="number" onChange={(e) => { setAntiguedad(e.target.value) }} /></label><br />
          {
            editar == true ?
              <>
                <button onClick={update}>Actualizar</button>
                <button onClick={cancelar}>Cancelar</button>
              </>
              :
              <button onClick={add}>registrar</button>
          }
        </div>

        <div className="lista">
          {
            usuariosList.map((val, key) => {
              return (
                <div key={val.id} className="card">
                  <div className="nombre" >{val.nombre}</div>
                  <button onClick={() => { editarUsuario(val) }}>Actualizar datos</button>
                  <button onClick={()=>{
                    deleteUser(val.id)
                  }}>eliminar</button>
                  </div>
                
              )

            })
          }
        </div>

      </div >
    </>
  )
}

export default App
