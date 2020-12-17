using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DancePlatform.BL.Interfaces;

namespace DancePlatform.API.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegistrationService _service;

        public UserController(IRegistrationService service)
        {
            _service = service;
        }

        [HttpGet("registrations/{userId}")]
        public async Task<IActionResult> GetRegistrations(int userId)
        {
            var registrations = await _service.GetUserRegistrations(userId);

            if (registrations == null)
            {
                return NotFound();
            }

            return Ok(registrations);
        }
        
    }
}
