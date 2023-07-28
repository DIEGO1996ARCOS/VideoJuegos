using System;
using System.Collections.Generic;

namespace BibliotecaVideoJuegos.Models
{
    public partial class VideoJuego
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public int Anio { get; set; }
        public int Calificacion { get; set; }
        public int? IdConsola { get; set; }
        public int? IdGenero { get; set; }

        public virtual Consola? IdConsolaNavigation { get; set; }
        public virtual Genero? IdGeneroNavigation { get; set; }
    }
}
