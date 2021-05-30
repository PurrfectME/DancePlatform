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
		private readonly IRegistrationService _registrationService;
		private readonly IWorkshopService _workshopService;

		public RegistrationController(IRegistrationService service, IWorkshopService workshopService)
		{
			_registrationService = service;
			_workshopService = workshopService;
		}

		[HttpPost("add")]
		public async Task<IActionResult> PostRegistration(CreateRegistrationRequest request)
		{
			var existingRegistration = await _registrationService.GetByUserAndWorkshopIds(request.UserId, request.WorkshopId);
			var workshopToUpdate = await _workshopService.GetById(request.WorkshopId);

            if (existingRegistration == null && request.IsPaid)
            {
				await _registrationService.Create(new Registration
				{
					UserId = request.UserId,
					WorkshopId = request.WorkshopId,
					IsPaid = request.IsPaid,
					IsDesired = false,
				});

				workshopToUpdate.CurrentUsersCount++;
				await _workshopService.Update(workshopToUpdate);

			}
            else if(request.IsDesired)
            {
				await _registrationService.Create(new Registration
				{
					UserId = request.UserId,
					WorkshopId = request.WorkshopId,
					IsPaid = false,
					IsDesired = request.IsDesired,
				});
            }
			else
			{
				existingRegistration.IsPaid = true;
				existingRegistration.IsDesired = false;
				await _registrationService.Update(existingRegistration);

                workshopToUpdate.CurrentUsersCount++;
                await _workshopService.Update(workshopToUpdate);
            }

			return Ok();
		}

        [HttpGet("getAll")]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _registrationService.GetAll());
		}

		[HttpPost("delete/{id}")]
		public async Task<IActionResult> Delete(int id)
		{
			var registrationsToDelete = await _registrationService.GetById(id);

            if (registrationsToDelete == null)
            {
                return NotFound();
            }

            await _registrationService.Delete(registrationsToDelete);

            return Ok();
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var registration = await _registrationService.GetById(id);

			return Ok(registration);
		}

		[HttpPut("update")]
		public async Task<IActionResult> Update(Registration model)
		{
			await _registrationService.Update(model);

			return Ok();
		}

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUsersWorkshops(int userId)
        {
            var result = await _registrationService.GetUserWorkshops(userId);

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
                await _registrationService.CheckoutUsers(request.UserId, request.WorkshopId);
            }

            return Ok();
        }

		[HttpGet("visited/{userId}")]
		public async Task<IActionResult> GetUsersVisitedWorkshops(int userId)
        {
			return Ok(await _registrationService.GetUserVisitedWorkshops(userId));
        }

		[HttpPost("remove-desired/{userId}/{workshopId}")]
		public async Task<IActionResult> RemoveFromDesired(int userId, int workshopid)
        {
			await _registrationService.RemoveFromDesired(userId, workshopid);

			return Ok();
        }
	}
}
