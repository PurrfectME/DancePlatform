using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
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

        public Task<Workshop> GetById(int id)
        {
            return _context.Workshops.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task Update(Workshop entity)
		{
			_context.Workshops.Update(entity);

			await _context.SaveChangesAsync();
		}
	}
}
