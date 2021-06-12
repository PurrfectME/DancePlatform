using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task<Place> Create(Place entity)
        {
            var res = (await _context.Places.AddAsync(entity)).Entity;

            await _context.SaveChangesAsync();

            return res;
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

        public Task<List<Place>> GetAll(int organizerId)
        {
            return _context.Places
                .Where(x => x.CreatedBy == organizerId)
                .ToListAsync();
        }

        public Task<Place> GetById(int id)
        {
            return _context.Places.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<Place> Update(Place entity)
        {
            var res = (_context.Places.Update(entity)).Entity;

            await _context.SaveChangesAsync();
            return res;
        }
    }
}
