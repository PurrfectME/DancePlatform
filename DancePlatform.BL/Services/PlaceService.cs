using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
    public class PlaceService : IPlaceService
    {
        private readonly IApplicationContext _context;

        public PlaceService(IApplicationContext context)
        {
            _context = context;
        }

        public async Task Create(Place entity)
        {
            await _context.Places.AddAsync(entity);

            await _context.SaveChangesAsync();
        }

        public async Task Delete(Place entity)
        {
            _context.Places.Remove(entity);

            await _context.SaveChangesAsync();
        }

        public async Task Delete(List<Place> entities)
        {
            _context.Places.RemoveRange(entities);

            await _context.SaveChangesAsync();
        }

        public async Task Update(Place entity)
        {
            _context.Places.Update(entity);

            await _context.SaveChangesAsync();
        }
    }
}
