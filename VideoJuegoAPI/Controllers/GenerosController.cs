using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//Library Class DLL
using BibliotecaVideoJuegos.Models;


namespace VideoJuegoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GenerosController : ControllerBase
    {
        private readonly DB_TEST_VDGContext _context = new DB_TEST_VDGContext();

        public GenerosController(DB_TEST_VDGContext context)
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
                var lsGeneros = _context.Generos
                    .FromSqlInterpolated($"EXEC spListaGeneros")
                    .AsAsyncEnumerable();

                if (lsGeneros != null)
                {
                    response.Status = 1;
                    response.Data = lsGeneros;
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
        public async Task<IActionResult> Guardar([FromBody] Consola request)
        {
            ResposeObject response = new ResposeObject();

            try
            {
                await _context.Database
                    .ExecuteSqlInterpolatedAsync($@"EXEC spInsert_Generos @nombre={request.Nombre}");

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
        public async Task<IActionResult> Actualizar([FromBody] Genero request)
        {
            ResposeObject response = new ResposeObject();

            try
            {
                await _context.Database.ExecuteSqlRawAsync($@"EXEC spUpdate_Generos @id={request.Id}, @nombre={request.Nombre}");

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
                VideoJuego video;

                try
                {
                    video = _context.VideoJuegos.Where(c => c.IdGenero == id).Single();
                }
                catch
                {
                    video = null;
                }

                if (video != null)
                {
                    response.Status = 0;
                    response.Message = "No es posible eliminar el género, contiene videojuegos relacionados ";

                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                else
                {
                    Genero genero = _context.Generos.Find(id);
                    _context.Generos.Remove(genero);
                    await _context.SaveChangesAsync();

                    response.Status = 1;
                    response.Message = "Se ejecuto correctamente";

                    return StatusCode(StatusCodes.Status200OK, response);
                }  
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
