using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
	public class WorkshopService : IWorkshopService
	{
		private readonly IApplicationContext _context;

		public WorkshopService(IApplicationContext context)
		{
			_context = context;
		}

		public async Task Create(Workshop entity)
		{
			await _context.Workshops.AddAsync(entity);

			await _context.SaveChangesAsync();
		}

		public async Task Delete(Workshop entity)
		{
			_context.Workshops.Remove(entity);

			await _context.SaveChangesAsync();
		}

		public Task<List<Workshop>> GetAll()
		{
			return _context.Workshops.ToListAsync();
		}

        public async Task<List<User>> GetWorkshopUsers(int workshopId)
        {
            var workshop = await _context.Workshops
                .AsNoTracking()
                .Include(x => x.Registrations)
                .ThenInclude(x => x.User)
                .FirstOrDefaultAsync(x => x.Id == workshopId);

            return workshop.Registrations.Select(registration => registration.User).ToList();
        }

        public Task<Workshop> GetById(int id)
        {
            return _context.Workshops.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId)
        {
            var registrations = await _context.Registrations
                .AsNoTracking()
                .Include(x => x.Workshop)
                .Include(x => x.User)
                .ToListAsync();

            var result = new List<Workshop>();
            
            foreach (var registration in registrations)
            {
                if (registration.UserId != userId)
                {
                    result.Add(registration.Workshop);
                }
            }

            return result;
        }

        public async Task Update(Workshop entity)
		{
			_context.Workshops.Update(entity);

			await _context.SaveChangesAsync();
		}
	}
}
