﻿using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DancePlatform.API.Controllers
{
    [Authorize(Roles = "Organizer")]
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
        public async Task<IActionResult> Add(CreateChoreographerRequest request)
        {
            var result = await _service.Create(new Choreographer
            {
                CreatedBy = request.CreatedBy,
                DateOfBirth = request.DateOfBirth,
                Description = request.Description,
                Link = request.Link,
                Name = request.Name,
                Style = request.Style
            });

            return Ok(result);
        }

        [HttpGet("getAll/{organizerId}")]
        public async Task<IActionResult> GetAll(int organizerId)
        {
            return Ok(await _service.GetAll(organizerId));
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
