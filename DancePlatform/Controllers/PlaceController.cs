using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace DancePlatform.API.Controllers
{
    [Authorize(Roles = "Organizer")]
    [Route("place")]
    [ApiController]
    public class PlaceController : ControllerBase
    {
        private readonly IPlaceService _service;

        public PlaceController(IPlaceService service)
        {
            _service = service;
        }

        [HttpGet("getAll/{organizerId}")]
        public async Task<IActionResult> GetAll(int organizerId)
        {
            return Ok(await _service.GetAll(organizerId));
        }

        [HttpPost("add")]
        public async Task<IActionResult> Post([FromBody] CreatePlaceRequest request)
        {
            var result = await _service.Create(new Place
            {
                StudioName = request.StudioName,
                Address = request.Address,
                CreatedBy = request.CreatedBy
            });

            return Ok(result);
        }

        [HttpPost("update")]
        public async Task<IActionResult> Update([FromBody] UpdatePlaceRequest request)
        {
            var placeToUpdate = await _service.GetById(request.Id);

            if (placeToUpdate == null)
            {
                return NotFound();
            }

            placeToUpdate.StudioName = request.StudioName;
            placeToUpdate.Address = request.Address;

            return Ok(await _service.Update(placeToUpdate));
        }

        [HttpPost("delete/{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var placeToDelete = await _service.GetById(id);

            if (placeToDelete == null)
            {
                return NotFound();
            }

            await _service.Delete(placeToDelete);

            return Ok();
        }

    }
}
