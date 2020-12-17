using System;
using System.Threading.Tasks;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DancePlatform.API.Controllers
{
    [Route("workshop")]
    [ApiController]
    public class WorkshopController : ControllerBase
    {
        private readonly IWorkshopService _service;

        public WorkshopController(IWorkshopService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> PostWorkshop(CreateWorkshopRequest request)
        {
            //TEST DATA
            //request.Category = Category.Pro;
            request.Date = DateTimeOffset.UtcNow;
            request.Name = "TEST_WORKSHOP";
            request.Price = 42069;
            request.Style = Style.JazzFunk;
            request.Choreographer = "TEST_TEACHER";
            request.NumberOfPeople = 100;

            await _service.Create(
                new Workshop
                {
                    Choreographer = request.Choreographer,
                    Category = request.Category,
                    Style = request.Style,
                    Price = request.Price,
                    Name = request.Name,
                    Date = request.Date,
                    NumberOfPeople = request.NumberOfPeople
                });

            return Ok();
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var workshopToDelete = await _service.GetById(id);

            if (workshopToDelete == null)
            {
                return NotFound();
            }

            await _service.Delete(workshopToDelete);

            return Ok();
        }

        [HttpGet("get/{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var workshop = await _service.GetById(id);

            if (workshop == null)
            {
                return NotFound();
            }

            return Ok(workshop);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(Workshop model)
        {
            await _service.Update(model);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("registered-users/{workshopId}")]
        public async Task<IActionResult> GetRegisteredUsersOnWorkshop(int workshopId)
        {
            var result = await _service.GetWorkshopUsers(workshopId);

            return Ok(result);
        }
    }
}
