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
    [Produces("application/json")]
    public class WorkshopController : ControllerBase
    {
        private readonly IWorkshopService _service;

        public WorkshopController(IWorkshopService service)
        {
            _service = service;
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("add")]
        public async Task<IActionResult> PostWorkshop([FromBody] CreateWorkshopRequest request)
        {
            return Ok(await _service.Create(
                new Workshop
                {
                    Choreographer = request.Choreographer,
                    Category = request.Category,
                    Style = request.Style,
                    Price = request.Price,
                    Name = request.Name,
                    Date = request.Date,
                    NumberOfPeople = request.NumberOfPeople
                }));
        }

        [HttpGet("getAll")]
        public async Task<IActionResult> GetAll()
        {
            return Ok(await _service.GetAll());
        }

        [Authorize(Roles = "Admin")]
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

        [Authorize(Roles = "Admin")]
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UpdateWorkshopRequest request)
        {
            var workshopToUpdate = await _service.GetById(request.Id);

            if (workshopToUpdate == null)
            {
                return NotFound();
            }

            workshopToUpdate.Category = request.Category;
            workshopToUpdate.Choreographer = request.Choreographer;
            workshopToUpdate.Style = request.Style;
            workshopToUpdate.Price = request.Price;
            workshopToUpdate.Date = request.Date;
            workshopToUpdate.NumberOfPeople = request.NumberOfPeople;
            workshopToUpdate.Name = request.Name;

            await _service.Update(workshopToUpdate);

            return Ok();
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("registered-users/{workshopId}")]
        public async Task<IActionResult> GetRegisteredUsersOnWorkshop(int workshopId)
        {
            var result = await _service.GetWorkshopUsers(workshopId);

            return Ok(result);
        }

        [HttpGet("available/{userId}")]
        public async Task<IActionResult> GetAvailableWorkshopsForUser(int userId)
        {
            var result = await _service.GetAvailableWorkshopsForUser(userId);

            return Ok(result);
        }
    }
}
