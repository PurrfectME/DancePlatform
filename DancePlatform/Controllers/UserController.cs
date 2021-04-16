using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Requests;
using System;

namespace DancePlatform.API.Controllers
{
    [Route("user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;
        private readonly IUserService _userService;

        public UserController(IRegistrationService registrationService, IUserService userService)
        {
            _registrationService = registrationService;
            _userService = userService;
        }

        [HttpGet("registrations/{userId}")]
        public async Task<IActionResult> GetRegistrations(int userId)
        {
            var registrations = await _registrationService.GetUserRegistrations(userId);

            if (registrations == null)
            {
                return NotFound();
            }

            return Ok(registrations);
        }

        [HttpPost("upload-image/{userId}")]
        public async Task<IActionResult> UploadImage([FromBody] CreateImageRequest request, int userId)
        {
            //data:image/png;base64,
            request.Base64Img = request.Base64Img.Remove(0, 23);
            var converted = Convert.FromBase64String(request.Base64Img);

            await _userService.UploadImage(converted, userId);

            return Ok();
        }

        [HttpGet("get-photo/{id}")]
        public async Task<string> GetPhoto(int id)
        {
            var photo = await _userService.GetUserPhoto(id);

            if (photo == null)
            {
                return null;
            }

            return Convert.ToBase64String(photo);
        }

        [HttpPost("delete-photo/{id}")]
        public async Task<IActionResult> DeletePhoto(int id)
        {
            await _userService.DeleteUserPhoto(id);

            return Ok();
        }

    }
}
