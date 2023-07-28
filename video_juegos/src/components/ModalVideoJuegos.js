
import { useState, useEffect } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button, Col, Row } from "reactstrap";

const modelJuego = {
    id: 0,
    titulo: "",
    descripcion: "",
    anio: 0,
    calificacion: 0,
    idConsola: 0,
    idGenero: 0,
}

const ModalVideoJuegos = ({ mostrarModal, setMostrarModal, consola, genero, guardarJuego, editar, setEditar, editarJuego }) => {

    const [juego, setJuego] = useState([])

    const actualizarJuego = (e) => {
        setJuego(
            {
                ...juego,
                [e.target.name]: e.target.value
            }
        )

    }

    const enviarDatos = () => {
        if (validaCampo()) {
            if (consola.length === 1) {
                juego.idConsola = consola[0].id
            }
            if (genero.length === 1) {
                juego.idGenero = genero[0].id
            }

            if (juego.id == 0) {
                guardarJuego(juego)
            } else {
                editarJuego(juego)
            }

            setJuego(modelJuego);
        }
    }

    useEffect(() => {
        if (editar != null) {
            setJuego(editar);
        } else {
            setJuego(modelJuego);
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    const validaCampo = () => {
        let valor = true;

        if (juego.titulo === "" || juego.titulo === undefined) {
            window.alert("Nombre requerido");
            valor = false;
        }
        if (juego.descripcion === "" || juego.descripcion === undefined) {
            window.alert("Descripción requerido");
            valor = false;
        }
        if (juego.anio < 1) {
            window.alert("Año requerido");
            valor = false;
        }

        if (juego.calificacion < 1 || juego.calificacion > 10) {
            window.alert("La calificación es requerida, no puede ser mayor a 10");
            valor = false;
        }

        return valor;
    }


    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {juego.id == 0 ? "Nuevo video juego" : "Editar video juego"}
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>T&#237;tulo</Label>
                        <Input name="titulo" onChange={(e) => actualizarJuego(e)} value={juego.titulo} />
                    </FormGroup>
                    <FormGroup>
                        <Label>Descripci&#243;n</Label>
                        <Input name="descripcion" onChange={(e) => actualizarJuego(e)} value={juego.descripcion} />
                    </FormGroup>
                    <Row>
                        <Col sm="6">
                            <FormGroup>
                                <Label>A&#241;o</Label>
                                <Input name="anio" type="number" onChange={(e) => actualizarJuego(e)} value={juego.anio} />
                            </FormGroup>
                        </Col>
                        <Col sm="6">
                            <FormGroup>
                                <Label>Calificaci&#243;n</Label>
                                <Input name="calificacion" type="number" onChange={(e) => actualizarJuego(e)} value={juego.calificacion} />
                            </FormGroup>
                        </Col>
                    </Row>

                    <FormGroup>
                        <Label>Consola</Label>
                        {/*<Input type="select" onChange={(e) => actualizarJuego(e)} name={juego.id == 0 ? "idConsola" : "idConsolaSelect"} value={juego.id == 0 ? juego.idConsola : juego.idConsolaSelect}>*/}
                        <Input type="select" onChange={(e) => actualizarJuego(e)} name="idConsola" value={juego.idConsola}>

                            {
                                (consola.length < 1) ? (
                                    <option>No tiene registros</option>
                                ) : (
                                    consola.map((item) => (
                                        (juego.idConsola === item.id) ? (
                                            <option key={item.id} value={item.id} selected>{item.nombre}</option>
                                        ) : (
                                            <option key={item.id} value={item.id}>{item.nombre}</option>
                                        )
                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>
                    <FormGroup>
                        <Label>G&#233;nero</Label>
                        {/*<Input type="select" onChange={(e) => actualizarJuego(e)} name={juego.id == 0 ? "idGenero" : "idGeneroSelect"} value={juego.id == 0 ? juego.idGenero : juego.idGeneroSelect}>*/}
                        <Input type="select" onChange={(e) => actualizarJuego(e)} name="idGenero" value={juego.idGenero}>
                            {
                                (genero.length < 1) ? (
                                    <option>No tiene registros</option>
                                ) : (
                                    genero.map((gen) => (
                                        (juego.idGenero === gen.id) ? (
                                            <option key={gen.id} value={gen.id} selected>{gen.nombre}</option>
                                        ) : (
                                            <option key={gen.id} value={gen.id}>{gen.nombre}</option>
                                        )

                                    ))
                                )
                            }
                        </Input>
                    </FormGroup>

                </Form>

            </ModalBody>

            <ModalFooter>
                <Button size="md" color="primary" className="me-2" onClick={enviarDatos}>Guardar</Button>
                <Button size="md" color="danger" onClick={cerrarModal}>Cancelar</Button>
            </ModalFooter>

        </Modal>
    )
}


export default ModalVideoJuegos;