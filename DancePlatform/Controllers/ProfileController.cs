using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Requests;
using System;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Http;
using DancePlatform.BL.Responses;

namespace DancePlatform.API.Controllers
{
    [Route("user")]
    [ApiController]
    public class ProfileController : ControllerBase
    {
        private readonly IRegistrationService _registrationService;
        private readonly IProfileService _userService;
        private readonly UserManager<User> _userManager;

        public ProfileController(IRegistrationService registrationService, IProfileService userService, UserManager<User> userManager)
        {
            _registrationService = registrationService;
            _userService = userService;
            _userManager = userManager;
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

        [HttpPost("update-user")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserRequest request)
        {
            var userToUpdate = await _userManager.FindByIdAsync(request.Id.ToString());

            userToUpdate.Surname = request.Surname;
            userToUpdate.PhoneNumber = request.PhoneNumber;
            userToUpdate.Name = request.Name;
            userToUpdate.DateOfBirth = request.DateOfBirth;

            var result = await _userManager.UpdateAsync(userToUpdate);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new BaseResponse
                    { Status = "Error", Message = "Ошибка обновления данных" });
            }

            return Ok(await _userManager.FindByIdAsync(request.Id.ToString()));
        }

    }
}
