using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
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

        [HttpPost("update")]
        public async Task<IActionResult> Update(UpdateChoreographerRequest request)
        {
            var choreoToUpdate = await _service.GetById(request.Id);

            if (choreoToUpdate == null)
            {
                return NotFound();
            }

            choreoToUpdate.DateOfBirth = request.DateOfBirth;
            choreoToUpdate.Description = request.Description;
            choreoToUpdate.Link = request.Link;
            choreoToUpdate.Name = request.Name;
            choreoToUpdate.Style = request.Style;

            return Ok(await _service.Update(choreoToUpdate));
        }
    }
}
