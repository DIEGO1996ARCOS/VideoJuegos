import { Table, Button } from "reactstrap";



const TablaConsolas = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarConsola }) => {

    const enviarDatos = (consola) => {
        setEditar(consola);
        setMostrarModal(!mostrarModal)
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
                            <td colSpan="4">Sin registros</td>
                        </tr>
                    ) : (
                            data.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.id}</td>
                                    <td>{item.nombre}</td>
                                    <td>
                                        <Button color="primary" size="sm" className="me-2"
                                            onClick={() => enviarDatos(item)}
                                        >Editar</Button>
                                        <Button color="danger" size="sm"
                                            onClick={() => eliminarConsola(item.id)}
                                        >Eliminar</Button>
                                    </td>
                                </tr>
                            ))
                    )
                }
            </tbody>
        </Table>
    )
}


export default TablaConsolas;