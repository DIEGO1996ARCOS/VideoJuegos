using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//Library Class DLL
using BibliotecaVideoJuegos.Models;
using BibliotecaVideoJuegos.ViewModels;


namespace VideoJuegoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoJuegoController : ControllerBase
    {
        private readonly DB_TEST_VDGContext _context = new DB_TEST_VDGContext();

        public VideoJuegoController(DB_TEST_VDGContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("Lista")]
        public dynamic Lista()
        {
            ResposeObject response = new ResposeObject();

            try
            {

                var lsVideoJuegos = _context.ViewVideoJuegos
                    .FromSqlInterpolated($"EXEC spListaVideoJuegos")
                    .AsAsyncEnumerable();

                if (lsVideoJuegos != null)
                {
                    response.Status = 1;
                    response.Data = lsVideoJuegos;
                    response.Message = "Ejecutado correctamente";
                }
                else
                {
                    response.Status = 0;
                    response.Message = "No hay registros";
                }

            }
            catch (Exception ex)
            {
                response.Status = -1;
                response.Message = ex.ToString();
            }

            return response;
        }

        [HttpPost]
        [Route("Guardar")]
        public async Task<IActionResult> Guardar([FromBody] VideoJuegosViewModel request)
        {
            ResposeObject response = new ResposeObject();

            try
            {
                await _context.Database
                    .ExecuteSqlInterpolatedAsync($@"EXEC spInsert_VideoJuegos 
                        @titulo={request.Titulo},
                        @descripcion={request.Descripcion},
                        @anio={request.Anio},
                        @calificacion={request.Calificacion},
                        @idConsola={request.IdConsola},
                        @idGenero={request.IdGenero}");

                response.Status = 1;
                response.Message = "Se ejecuto correctamente";

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = ex.ToString();

                return StatusCode(StatusCodes.Status404NotFound, response);
            }


        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] VideoJuegosViewModel request)
        {
            ResposeObject response = new ResposeObject();

            try
            {
               await  _context.Database.ExecuteSqlRawAsync($@"EXEC spUpdate_VideoJuegos 
                    @id={request.Id},
                    @titulo={request.Titulo},
                    @descripcion={request.Descripcion},
                    @anio={request.Anio},
                    @calificacion={request.Calificacion},
                    @idConsola={request.IdConsola},
                    @idGenero={request.IdGenero}");

                response.Status = 1;
                response.Message = "Se ejecuto correctamente";

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = ex.ToString();

                return StatusCode(StatusCodes.Status404NotFound, response);
            }


        }


        [HttpDelete]
        [Route("Eliminar/{id:int}")]
        public async Task<IActionResult> Eliminar(int id)
        {
            ResposeObject response = new ResposeObject();
            try
            {
                VideoJuego video = _context.VideoJuegos.Find(id);
                _context.VideoJuegos.Remove(video);
                await _context.SaveChangesAsync();

                response.Status = 1;
                response.Message = "Se ejecuto correctamente";

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = ex.ToString();

                return StatusCode(StatusCodes.Status404NotFound, response);
            }

        }


    }
}
