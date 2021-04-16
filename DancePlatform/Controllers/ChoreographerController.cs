using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DancePlatform.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("choreographer")]
    [ApiController]
    public class ChoreographerController : ControllerBase
    {
        private readonly IChoreographerService _service;


        public ChoreographerController(IChoreographerService service)
        {
            _service = service;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(Choreographer request)
        {
            return Ok(await _service.Create(request));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var choreographerToDelete = await _service.GetById(id);

            if (choreographerToDelete == null)
            {
                return NotFound();
            }

            await _service.Delete(choreographerToDelete);

            return Ok();
        }
    }
}
