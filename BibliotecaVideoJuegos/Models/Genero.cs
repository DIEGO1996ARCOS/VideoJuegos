using System;
using System.Collections.Generic;

namespace BibliotecaVideoJuegos.Models
{
    public partial class Genero
    {
        public Genero()
        {
            VideoJuegos = new HashSet<VideoJuego>();
        }

        public int Id { get; set; }
        public string Nombre { get; set; } = null!;

        public virtual ICollection<VideoJuego> VideoJuegos { get; set; }
    }
}
