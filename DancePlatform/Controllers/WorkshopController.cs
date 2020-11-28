using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DancePlatform.Controllers
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

        [HttpPost("add")]
        public async Task<IActionResult> PostWorkshop(Workshop request)
        {
            //TEST DATA
            request.Category = "TERST";
            request.Date = DateTimeOffset.UtcNow;
            request.Name = "TEST_WORKSHOP";
            request.Price = 42069;

            await _service.Create(request);

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


    }
}
