using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BibliotecaVideoJuegos.Models
{
    public class ResposeObject
    {
        public int Status { get; set; }
        public Object Data { get; set; }
        public string Message { get; set; }
    }
}
