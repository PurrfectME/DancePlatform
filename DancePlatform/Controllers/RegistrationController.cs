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
            await _service.Create(new Registration
            {
                UserId = request.UserId,
                WorkshopId = request.WorkshopId,
				IsPaid = request.IsPaid,
				IsDesired = request.IsDesired
            });

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
			var registrations = await _service.GetById(id);

			if (registrations.Count == 0)
			{
				return NotFound();
			}

			return Ok(registrations);
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

        [Authorize(Roles = "Admin")]
        [HttpPost("checkout-users")]
        public async Task<IActionResult> CheckoutUsers(List<CheckoutUsersRequest> requests)
        {
            foreach (var request in requests)
            {
                await _service.CheckoutUsers(request.UserId, request.WorkshopId);
            }

            return Ok();
        }
	}
}
