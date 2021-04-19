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

		public async Task<Workshop> Create(Workshop entity)
		{
			var res = (await _context.Workshops.AddAsync(entity)).Entity;

			await _context.SaveChangesAsync();

            return res;
        }

		public async Task Delete(Workshop entity)
		{
			_context.Workshops.Remove(entity);

			await _context.SaveChangesAsync();
		}

		public Task<List<Workshop>> GetAll()
		{
			return _context.Workshops
                .Include(X => X.Place)
                .Include(X => X.Choreographer)
                .Include(X => X.Registrations)
                .Where(x => x.IsClosed != true)
                .ToListAsync();
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

        public async Task<Workshop> GetById(int id)
        {
            var t = await _context.Workshops
                .Include(x => x.Choreographer)
                .Include(x => x.Place)
                .FirstOrDefaultAsync(x => x.Id == id);
            _context.Workshops.Attach(t);
            return t;
        }

        public async Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId)
        {
            var works = await _context.Workshops
                .AsNoTracking()
                .Include(x => x.Choreographer)
                .Include(x => x.Registrations)
                .Include(x => x.Place)
                .Where(x => x.IsClosed != true)
                .ToListAsync();

            var result = new List<Workshop>();

            foreach (var item in works)
            {
                if (item.Registrations.Count == 0)
                {
                    result.Add(item);
                }
                else
                {
                    foreach (var reg in item.Registrations)
                    {
                        if (reg.UserId != userId)
                        {
                            result.Add(item);
                        }
                    }
                }
            }

            return result;
        }

        public async Task<Workshop> Update(Workshop entity)
        {
            var res = (_context.Workshops.Update(entity)).Entity;

            await _context.SaveChangesAsync();
            return res;
        }

        public Task<List<Workshop>> GetClosed()
        {
            return _context.Workshops
                .Include(X => X.Place)
                .Include(X => X.Choreographer)
                .Include(X => X.Registrations)
                .Where(x => x.IsClosed == true)
                .ToListAsync();
        }
    }
}
