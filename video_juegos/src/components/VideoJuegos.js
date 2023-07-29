
import { useState, useEffect } from "react";
import { Col, Container, Row, Card, CardHeader, CardBody, Button } from "reactstrap";
import ModalVideoJuego from "./ModalVideoJuegos";
import TablaVideoJuegos from "./TablaVideoJuegos";
import { mostrarAdvertencia, mostrarMensaje } from "./Alerts/Alerts";


const VideoJuegos = () => {

    const [juego, setJuego] = useState([]);

    const [mostrarModal, setMostrarModal] = useState(false);

    const [consola, setConsolas] = useState([]);
    const [genero, setGenero] = useState([]);

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
        mostrarConsolas();
        mostrarListGenero();
    }, [])

    const mostrarJuegos = async () => {

        const response = await fetch("api/videoJuego/Lista");

        if (response.ok) {
            const data = await response.json();
            setJuego(data.data);
        } else {
            console.log("error en la lista");
        }

    }

    useEffect(() => {
        mostrarJuegos();
    }, [])

    const guardarJuego = async (juego) => {
        const response = await fetch("api/videoJuego/Guardar", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(juego)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Guardado", "success")

            setMostrarModal(!mostrarModal);
            mostrarJuegos();
        }

    }

    const editarJuego = async (juego) => {
        const response = await fetch("api/videojuego/Actualizar", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(juego)
        })

        if (response.ok) {
            const data = await response.json()

            mostrarMensaje(data.message, "Editado", "success")

            setMostrarModal(!mostrarModal);
            mostrarJuegos();
        }

    }

    const eliminarJuego = async (id) => {

        var respuesta = window.confirm("Desea eliminar el contacto?")

        if (!respuesta) {
            return;
        }

        const response = await fetch("api/juego/Eliminar/" + id, {
            method: 'DELETE',
        })

        if (response.ok) {
            mostrarAdvertencia("Eliminado correctamente", "success")
            mostrarJuegos();
        }

    }

    const validaDatos = () => {
        let valida = true;
        if (consola.length < 1 || genero.length < 1) {
            mostrarAdvertencia("Debe tener al menos 1 registro en el catalogo de consola/genero", "warning")
            valida = false;
        }

        if (valida) {
            setMostrarModal(!mostrarModal)
        }  
    }


    return (
        <Container>
            <Row className="mt-5">
                <Col sm="12">
                    <Card>
                        <CardHeader>
                            <h5>Lista de video juegos</h5>
                        </CardHeader>
                        <CardBody>
                            <Button color="success" size="sm"
                                onClick={() => validaDatos()}
                            >Nuevo video juego</Button>
                            <TablaVideoJuegos data={juego}
                                setEditar={setEditar}
                                mostrarModal={mostrarModal}
                                setMostrarModal={setMostrarModal}
                                eliminarJuego={eliminarJuego}
                                /*consola={consola}
                                genero={genero}*/
                            />
                        </CardBody>
                    </Card>
                </Col>
            </Row>

            <ModalVideoJuego
                mostrarModal={mostrarModal}
                setMostrarModal={setMostrarModal}
                consola={consola}
                genero={genero}
                guardarJuego={guardarJuego}
                editar={editar}
                setEditar={setEditar}
                editarJuego={editarJuego}
            />

        </Container>
    )

}


export default VideoJuegos;