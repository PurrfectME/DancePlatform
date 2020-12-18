using System;
using System.Collections.Generic;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

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
			//TEST DATA
			//request. = "TERST";
			//request.Date = DateTimeOffset.UtcNow;
			//request.Name = "TEST_WORKSHOP";
			//request.Price = 42069;

            for (var i = 0; i < request.WorkshopIds.Length; i++)
            {
                await _service.Create(new Registration
                {
                    UserId = request.UserId,
                    WorkshopId = request.WorkshopIds[i],
                    IsPresent = request.IsPresent,
                    Coast = request.Coast
                });
            }

			return Ok();
		}

        [HttpGet("getAll")]
		public async Task<IActionResult> GetAll()
		{
			return Ok(await _service.GetAll());
		}

		[HttpDelete("delete")]
		public async Task<IActionResult> Delete(DeleteRegistrationsRequest request)
		{
            try
            {
                var registrationsToDelete = await _service.GetById(request.Ids);

                if (registrationsToDelete == null)
                {
                    return NotFound();
                }

                await _service.Delete(registrationsToDelete);

                return Ok();
			}
            catch (Exception e)
            {
                Console.WriteLine(e);
                throw;
            }
			
		}

		[HttpGet("get/{id}")]
		public async Task<IActionResult> GetById(int id)
		{
			var registrations = await _service.GetById(new int[]{id});

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
	}
}
