using System;
using System.Collections.Generic;

namespace BibliotecaVideoJuegos.Models
{
    public partial class ViewVideoJuego
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public int Anio { get; set; }
        public int Calificacion { get; set; }
        public int? IdConsola { get; set; }
        public int? IdGenero { get; set; }
        public string NombreConsola { get; set; } = null!;
        public string NombreGenero { get; set; } = null!;
    }
}
