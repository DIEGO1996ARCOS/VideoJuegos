import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap";
import { mostrarAdvertencia } from "./Alerts/Alerts";


const modeloConsola = {
    id: 0,
    nombre: ""
}

const ModalConsolas = ({ mostrarModal, setMostrarModal, guardarConsola, editar, setEditar, editarConsola }) => {

    const [consola, setConsola] = useState(modeloConsola);

    const actualizarDato = (e) => {
        setConsola(
            {
                ...consola,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (validaCampo()) {
            if (consola.id == 0) {
                guardarConsola(consola);
            } else {
                editarConsola(consola);
            }

            setConsola(modeloConsola)
        }
    }

    useEffect(() => {
        if (editar != null) {
            setConsola(editar);
        } else {
            setConsola(modeloConsola);
        }
    }, [editar])

    const cerrarModal = () => {
        setMostrarModal(!mostrarModal)
        setEditar(null)
    }

    const validaCampo = () => {
        let valor = true;
        if (consola.nombre.trim() === "" || consola.nombre === undefined) {
            mostrarAdvertencia("Nombre requerido", "warning")

            valor = false;
        }

        return valor;
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {consola.id == 0 ? "Nueva Consola" : "Editar consola"}

            </ModalHeader>
            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" onChange={(e) => actualizarDato(e)} value={consola.nombre} />
                    </FormGroup>
                </Form>
            </ModalBody>

            <ModalFooter>
                <Button color="primary" size="sm" onClick={enviarDatos}>Guardar</Button>
                <Button color="danger" size="sm" onClick={cerrarModal}>Cerrar</Button>
            </ModalFooter>
        </Modal>
    )
}


export default ModalConsolas;