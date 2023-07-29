import { useEffect, useState } from "react";
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, ModalFooter, Button } from "reactstrap";
import { mostrarAdvertencia } from "./Alerts/Alerts";

const modelGenero = {
    id: 0,
    nombre: ""
}

const ModalGeneros = ({ mostrarModal, setmostrarModal, guardarGenero, editar, setEditar, editarGenero }) => {

    const [genero, setGenero] = useState(modelGenero);

    const actualizarGenero = (e) => {
        setGenero(
            {
                ...genero,
                [e.target.name]: e.target.value
            }
        )
    }

    const enviarDatos = () => {
        if (validaCampo()) {
            if (genero.id == 0) {
                guardarGenero(genero)
            } else {
                editarGenero(genero)
            }
            setGenero(modelGenero);
        }
        
    }

    useEffect(() => {
        if (editar != null) {
            setGenero(editar);
        } else {
            setGenero(modelGenero);
        }
    }, [editar])

    const cerrarModal = () => {
        setmostrarModal(!mostrarModal)
        setEditar(null)
    }

    const validaCampo = () => {
        let valor = true;

        if (genero.nombre.trim() === "" || genero.nombre === undefined) {
            mostrarAdvertencia("Nombre requerido", "warning")

            valor = false;
        }

        return valor;
    }

    return (
        <Modal isOpen={mostrarModal}>
            <ModalHeader>
                {genero.id == 0 ? "Nuevo género" : "Editar género"}
            </ModalHeader>

            <ModalBody>
                <Form>
                    <FormGroup>
                        <Label>Nombre</Label>
                        <Input name="nombre" required onChange={(e) => actualizarGenero(e)} value={genero.nombre} />
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


export default ModalGeneros;