using System;
using System.Collections.Generic;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DancePlatform.API.Controllers
{
	[Route("registration")]
	[ApiController]
	public class RegistrationController : ControllerBase
	{
		private readonly IRegistrationService _service;

		public RegistrationController(IRegistrationService service)
		{
			_service = service;
		}

		[HttpPost("add")]
		public async Task<IActionResult> PostRegistration(CreateRegistrationRequest request)
		{
			var existingRegistration = await _service.GetByUserAndWorkshopIds(request.UserId, request.WorkshopId);

            if (existingRegistration == null)
            {
				await _service.Create(new Registration
				{
					UserId = request.UserId,
					WorkshopId = request.WorkshopId,
					IsPaid = request.IsPaid,
					IsDesired = request.IsDesired
				});
			}
            else
            {
                if (existingRegistration.IsDesired)
                {
					existingRegistration.IsPaid = true;
					existingRegistration.IsDesired = false;
					await _service.Update(existingRegistration);
                }
                else
                {
					existingRegistration.IsPaid = false;
					existingRegistration.IsDesired = true;
					await _service.Update(existingRegistration);
				}
            }

			return Ok();
		}

        [HttpGet("getAll")]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _service.GetAll());
		}

		[HttpPost("delete/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var registrationsToDelete = await _service.GetById(id);

            if (registrationsToDelete == null)
            {
                return NotFound();
            }

            await _service.Delete(registrationsToDelete);

            return Ok();
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var registration = await _service.GetById(id);

			return Ok(registration);
		}

		[HttpPut("update")]
		public async Task<IActionResult> Update(Registration model)
		{
			await _service.Update(model);

			return Ok();
		}

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUsersWorkshops(int userId)
        {
            var result = await _service.GetUserWorkshops(userId);

            if (result == null)
            {
                return NotFound();
            }
            
            return Ok(result);
        }

        [Authorize(Roles = "Organizer")]
        [HttpPost("checkout-users")]
        public async Task<IActionResult> CheckoutUsers(List<CheckoutUsersRequest> requests)
        {
            foreach (var request in requests)
            {
                await _service.CheckoutUsers(request.UserId, request.WorkshopId);
            }

            return Ok();
        }

		[HttpGet("visited/{userId}")]
		public async Task<IActionResult> GetUsersVisitedWorkshops(int userId)
        {
			return Ok(await _service.GetUserVisitedWorkshops(userId));
        }
	}
}
