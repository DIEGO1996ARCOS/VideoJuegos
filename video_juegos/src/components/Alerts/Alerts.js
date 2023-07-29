import swal from "sweetalert";


export const mostrarMensaje = (titulo, text, icono) => {
    swal({
        title: titulo,
        text: text,
        icon: icono,
        button: "Ok"
    })
}


export const mostrarAdvertencia = (texto, icono) => {
    swal({ text: texto, icon: icono })
}

export const mostrarMensajeEliminar = (titulo, text, icono) => {
    swal({
        title: titulo,
        text: text,
        icon: icono,
        button: ["No", "Si"]
    }).then(respuesta => {
        if (respuesta) {
            swal({ text: "Eliminado correctamente", icon: "success" })
        }
    })
}




