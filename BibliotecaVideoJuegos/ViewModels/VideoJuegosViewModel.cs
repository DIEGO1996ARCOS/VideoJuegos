using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaVideoJuegos.ViewModels
{
    public class VideoJuegosViewModel
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = null!;
        public string Descripcion { get; set; } = null!;
        public int Anio { get; set; }
        public int Calificacion { get; set; }
        public int? IdConsola { get; set; }
        public int? IdGenero { get; set; }


    }
}
