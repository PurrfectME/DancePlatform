using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DancePlatform.API.Controllers
{
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
            await _service.Create(request);
            return Ok();
        }
    }
}
