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





