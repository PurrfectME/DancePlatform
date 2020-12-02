using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
	public class RegistrationService : IRegistrationService
	{
		private readonly IApplicationContext _context;

		public RegistrationService(IApplicationContext context)
		{
			_context = context;
		}

		public async Task Create(Registration entity)
		{
			await _context.Registrations.AddAsync(entity);

			await _context.SaveChangesAsync();
		}

		public async Task Delete(Registration entity)
		{
			_context.Registrations.Remove(entity);

			await _context.SaveChangesAsync();
		}

		public Task<List<Registration>> GetAll()
		{
			return _context.Registrations.ToListAsync();
		}

		public Task<Registration> GetById(int id)
		{
			return _context.Registrations.FirstOrDefaultAsync(x => x.Id == id);
		}

		public async Task Update(Registration entity)
		{
			_context.Registrations.Update(entity);

			await _context.SaveChangesAsync();
		}
	}
}
