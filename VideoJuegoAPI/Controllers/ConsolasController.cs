using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

//Library Class DLL
using BibliotecaVideoJuegos.Models;

namespace VideoJuegoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConsolasController : ControllerBase
    {
        private readonly DB_TEST_VDGContext _context = new DB_TEST_VDGContext();

        public ConsolasController(DB_TEST_VDGContext context)
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
                var lsConsolas = _context.Consolas
                    .FromSqlInterpolated($"EXEC spListaConsolas")
                    .AsAsyncEnumerable();

                if ( lsConsolas != null )
                {
                    response.Status = 1;
                    response.Data = lsConsolas;
                    response.Message = "Ejecutado correctamente";
                }
                else
                {
                    response.Status = 1;
                    response.Message = "No hay registros";
                }    
                
            }
            catch (Exception ex)
            {
                response.Status = 0;
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
                    .ExecuteSqlInterpolatedAsync($@"EXEC spInsert_Consolas @nombre={request.Nombre}");

                response.Status = 1;
                response.Message = "Se ejecuto correctamente";

                return StatusCode(StatusCodes.Status200OK, response);
            }
            catch(Exception ex)
            {
                response.Status = 0;
                response.Message = ex.ToString();

                return StatusCode(StatusCodes.Status404NotFound, response);
            }


        }

        [HttpPut]
        [Route("Actualizar")]
        public async Task<IActionResult> Actualizar([FromBody] Consola request)
        {
            ResposeObject response = new ResposeObject();

            try
            {
                await _context.Database.ExecuteSqlRawAsync($@"EXEC spUpdate_Consolas @id={request.Id}, @nombre={request.Nombre}");

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
                    video = _context.VideoJuegos.Where(c => c.IdConsola == id).Single();
                }
                catch { 
                    video = null;
                }

                if (video != null)
                {
                    response.Status = 0;
                    response.Message = "No es posible eliminar la consola, contiene videojuegos relacionados ";

                    return StatusCode(StatusCodes.Status400BadRequest, response);
                }
                else
                {
                    Consola consola = _context.Consolas.Find(id);
                    _context.Consolas.Remove(consola);
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
