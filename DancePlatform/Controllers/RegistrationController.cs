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

			var registration = new Registration
			{
				UserId = request.UserId,
				WorkshopId = request.WorkshopId,
				IsPresent = request.IsPresent,
				Coast = request.Coast
			};

			await _service.Create(registration);

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
		public async Task<IActionResult> Update(Registration model)
		{
			await _service.Update(model);

			return Ok();
		}
	}
}
