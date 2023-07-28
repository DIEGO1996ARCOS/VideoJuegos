
import { Table, Button } from "reactstrap";


const TablaVideoJuegos = ({ data, setEditar, mostrarModal, setMostrarModal, eliminarJuego/*, consola, genero*/ }) => {

    const enviarDatos = (juego) => {
        setEditar(juego);
        setMostrarModal(!mostrarModal)
    }


    return (

        <Table striped responsive>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>T&#237;tulo</th>
                    <th>Descripci&#243;n</th>
                    <th>A&#241;o</th>
                    <th>Calificaci&#243;n</th>
                    <th>Consola</th>
                    <th>G&#233;nero</th>
                </tr>
            </thead>
            <tbody>
                {
                    (data.length < 1) ? (
                        <tr>
                            <td colSpan="8">Sin registros</td>
                        </tr>
                    ) : (
                        data.map((item) => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.titulo}</td>
                                <td>{item.descripcion}</td>
                                <td>{item.anio}</td>
                                <td>{item.calificacion}</td>
                                <td>
                                    {item.nombreConsola}
                                </td>
                                <td>
                                    {item.nombreGenero}
                                </td>
                                <td>
                                    <Button color="primary" size="sm" className="me-2"
                                        onClick={() => enviarDatos(item)}
                                    >Editar</Button>
                                    <Button color="danger" size="sm"
                                        onClick={() => eliminarJuego(item.id)}
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

export default TablaVideoJuegos;