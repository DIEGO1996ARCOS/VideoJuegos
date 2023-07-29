
import { useEffect, useState } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalGeneros from "./ModalGeneros";
import TablaGeneros from "./TablaGeneros";
import swal from "sweetalert";
import { mostrarAdvertencia, mostrarMensaje, mostrarMensajeEliminar } from "./Alerts/Alerts";



const Generos = () => {

    const [genero, setGenero] = useState([]);

    const [mostrarModal, setmostrarModal] = useState(null)

    const [editar, setEditar] = useState(null)

    const mostrarListGenero = async () => {

        const response = await fetch("api/generos/Lista")

        if (response.ok) {
            const data = await response.json()
            setGenero(data.data);
            
        } else {
            console.log("error en la lista de genero")
        }

    }

    useEffect(() => {
        mostrarListGenero();
    }, [])

    const guardarGenero = async (genero) => {
        const response = await fetch("api/generos/Guardar", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(genero)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Guardado", "success")
            
            setmostrarModal(!mostrarModal);
            mostrarListGenero();
        }
    }

    const editarGenero = async (genero) => {
        const response = await fetch("api/generos/Actualizar", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(genero)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Editado", "success")

            setmostrarModal(!mostrarModal);
            mostrarListGenero();
        }
    }

    const eliminarGenero = async (id) => {
        var respuesta = window.confirm("¿Desea eliminar el género?")

        if (!respuesta) {
            return;
        }
  

        const response = await fetch("api/generos/Eliminar/" + id, {
            method: "DELETE",
        })

        if (response.ok) {
            mostrarAdvertencia("Eliminado correctamente", "success")
            mostrarListGenero();
        }
    }

    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        
                        <CardHeader>
                            <h5>Lista de generos</h5>
                        </CardHeader>
                        
                        <CardBody>
                            <Button color="success" size="sm" onClick={() => setmostrarModal(!mostrarModal)}>Nuevo g&#233;nero</Button>
                            <TablaGeneros data={genero}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setmostrarModal={setmostrarModal}
                                eliminarGenero={eliminarGenero}
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalGeneros
                mostrarModal={mostrarModal}
                setmostrarModal={setmostrarModal}
                guardarGenero={guardarGenero}
                editar={editar}
                setEditar={setEditar}
                editarGenero={editarGenero}
            />
        </Container>
    )
}


export default Generos;