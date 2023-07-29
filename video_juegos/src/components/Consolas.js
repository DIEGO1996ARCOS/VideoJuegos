import { useState, useEffect } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import { mostrarAdvertencia, mostrarMensaje } from "./Alerts/Alerts";
import ModalConsolas from "./ModalConsolas";
import TablaConsolas from "./TablaConsolas";

const Consolas = () => {

    const [consolas, setConsolas] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [editar, setEditar] = useState(null);

    const mostrarConsolas = async () => {

        const response = await fetch("api/consolas/Lista");

        if (response.ok) {
            const data = await response.json();
            setConsolas(data.data);
        } else {
            console.log("error en la lista");
        }

    }

    useEffect(() => {
        mostrarConsolas();
    }, [])

    const guardar = async (consola) => {
        const response = await fetch("api/consolas/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(consola)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Guardado", "success")

            setMostrarModal(!mostrarModal);
            mostrarConsolas();
        }

    }

    const editarConsola = async (consola) => {
        const response = await fetch("api/consolas/Actualizar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(consola)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Editado", "success")

            setMostrarModal(!mostrarModal);
            mostrarConsolas();
        }

    }

    const eliminarConsola = async (id) => {

        var respuesta = window.confirm("¿Desea eliminar la consola?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/consolas/Eliminar/" + id, {
            method: 'DELETE',
        })

        if (response.ok) {
            mostrarAdvertencia("Eliminado correctamente", "success")
            mostrarConsolas();
        }
        else {
            const data = await response.json()
            mostrarMensaje(data.message, "Eliminar", "error")
        }

    }

    return(

        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de consolas</h5>
                        </CardHeader>
                        <CardBody>
                            <Button size="sm" color="success"
                                onClick={() => setMostrarModal(!mostrarModal)}
                            >Nueva Consola</Button>
                            <hr></hr>
                            <TablaConsolas data={consolas}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarConsola={eliminarConsola}
                            />
                            
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <ModalConsolas
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                guardarConsola={guardar}

                editar={editar}
                setEditar={setEditar}
                editarConsola={editarConsola}
            />
        </Container>

    )
}


export default Consolas;