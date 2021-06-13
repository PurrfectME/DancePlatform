using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DancePlatform.API.Controllers
{
    [Route("workshop")]
    [ApiController]
    [Produces("application/json")]
    public class WorkshopController : ControllerBase
    {
        private readonly IWorkshopService _service;
        private readonly UserManager<User> _userManager;

        public WorkshopController(IWorkshopService service, UserManager<User> userManager)
        {
            _service = service;
            _userManager = userManager;
        }

        [Authorize(Roles = "Organizer")]
        [HttpPost("add")]
        public async Task<IActionResult> PostWorkshop([FromBody] CreateWorkshopRequest request)
        {
            var name = _userManager.GetUserId(User);
            var user = await _userManager.FindByEmailAsync(name);

            return Ok(await _service.Create(
                new Workshop
                {
                    ChoreographerId = request.ChoreographerId,
                    Category = request.Category,
                    Style = request.Style,
                    Price = request.Price,
                    PlaceId = request.PlaceId,
                    Date = request.Date,
                    Time = request.Time,
                    MaxUsers = request.MaxUsers,
                    MinAge = request.MinAge,
                    CreatedBy = user.Id,
                    IsApprovedByModerator = false,
                    Photo = PreparePhoto(request.Photo),
                    PhotoName = request.PhotoName
                }));
        }

        [Authorize(Roles = "Organizer")]
        [HttpGet("getAll/{organizerId}")]
        public async Task<IActionResult> GetAll(int organizerId)
        {
            return Ok(await _service.GetAll(organizerId));
        }

        [Authorize(Roles = "Organizer")]
        [HttpGet("getAll-users-accounting/{organizerId}")]
        public async Task<IActionResult> GetAllForUsersAccounting(int organizerId)
        {
            return Ok(await _service.GetAllForUsersAccounting(organizerId));
        }

        [Authorize(Roles = "Organizer")]
        [HttpPost("delete/{id}")]
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

        [Authorize(Roles = "Organizer, Moderator, User")]
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

        [Authorize(Roles = "Organizer")]
        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UpdateWorkshopRequest request)
        {
            var workshopToUpdate = await _service.GetById(request.Id);

            if (workshopToUpdate == null)
            {
                return NotFound();
            }

            workshopToUpdate.Category = request.Category;
            workshopToUpdate.ChoreographerId = request.ChoreographerId;
            workshopToUpdate.Style = request.Style;
            workshopToUpdate.Price = request.Price;
            workshopToUpdate.Date = DateTimeOffset.Parse(request.Date.ToString());
            workshopToUpdate.Time = DateTimeOffset.Parse(request.Time.ToString());
            workshopToUpdate.PlaceId = request.PlaceId;
            workshopToUpdate.MinAge = request.MinAge;
            workshopToUpdate.MaxUsers = request.MaxUsers;
            workshopToUpdate.IsClosed = request.IsClosed;
            workshopToUpdate.PhotoName = request.PhotoName;
            workshopToUpdate.Photo = request.Photo.Contains("data") ? PreparePhoto(request.Photo) : Convert.FromBase64String(request.Photo);

            return Ok(await _service.Update(workshopToUpdate));
        }

        [Authorize(Roles = "Organizer")]
        [HttpGet("registered-users/{workshopId}")]
        public async Task<IActionResult> GetRegisteredUsersOnWorkshop(int workshopId)
        {
            var result = await _service.GetWorkshopUsers(workshopId);

            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("available/{userId}")]
        public async Task<IActionResult> GetAvailableWorkshopsForUser(int userId)
        {
            var user = await _userManager.FindByIdAsync(userId.ToString());
            List<Workshop> result;

            if(await _userManager.IsInRoleAsync(user, "User"))
            {
                result = await _service.GetAvailableWorkshopsForUser(userId, user.DateOfBirth);
            }
            else
            {
                result = await _service.GetAvailableWorkshopsForUser(userId, null);
            }

            return Ok(result);
        }

        [Authorize(Roles = "Moderator")]
        [HttpGet("awaiting-approval")]
        public async Task<IActionResult> GetWorkshopsForApproval()
        {
            var result = await _service.GetWorkshopsForApproval();

            return Ok(result);
        }

        [Authorize(Roles = "Organizer")]
        [HttpGet("workshops-history/{organizerId}")]
        public async Task<IActionResult> GetClosedWorkshops(int organizerId)
        {
            var result = await _service.GetClosed(organizerId);

            return Ok(result);
        }

        [Authorize(Roles = "User")]
        [HttpGet("desired/{userId}")]
        public async Task<IActionResult> GetDesiredWorkshops(int userId)
        {
            var result = await _service.GetUserDesiredWorkshops(userId);

            if(result == null)
            {
                return NotFound();
            }

            return Ok(result);
        }

        [Authorize(Roles = "Moderator")]
        [HttpPost("approve/{workshopId}")]
        public async Task<IActionResult> ApproveWorkshop(int workshopId)
        {
            await _service.ApproveWorkshop(workshopId);

            return Ok();
        }

        [Authorize(Roles = "Moderator")]
        [HttpPost("decline/{workshopId}/{comment}")]
        public async Task<IActionResult> DeclineWorkshop(int workshopId, string comment)
        {
            await _service.DeclineWorkshop(workshopId, comment);

            return Ok();
        }

        private byte[] PreparePhoto(string photoBase64)
        {
            return Convert.FromBase64String(photoBase64.Remove(0, 23));
        }
    }
}
