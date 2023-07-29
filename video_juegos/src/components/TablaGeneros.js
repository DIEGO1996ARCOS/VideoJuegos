
import { Table, Button } from "reactstrap";

const TablaGeneros = ({ data, setEditar, mostrarModal, setmostrarModal, eliminarGenero }) => {

    const enviarDatos = (genero) => {
        setEditar(genero)
        setmostrarModal(!mostrarModal)
    }

    return (
        <Table striped responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Acci&#243;n</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="4">
                                No hay registros
                            </td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.nombre}</td>
                                <td>
                                    <Button color="primary" className="me-2" size="sm" onClick={() => enviarDatos(item)}>Editar</Button>
                                    <Button color="danger" size="sm" onClick={() => eliminarGenero(item.id)}>Eliminar</Button>
                                </td>
                            </tr>
                        ))
                    )
                }
            </tbody>
        </Table>

    )

}


export default TablaGeneros;