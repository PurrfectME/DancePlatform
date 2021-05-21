using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
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

        public async Task Delete(List<Registration> entities)
        {
            _context.Registrations.RemoveRange(entities);

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

        public async Task<List<Registration>> GetUserRegistrations(int userId)
        {
            var registrations = await _context.Registrations
                .AsNoTracking()
                .Include(x => x.User)
                .Where(x => x.UserId == userId && x.IsPaid)
                .ToListAsync();

            return registrations.Count == 0 ? null : registrations;
        }

        public async Task<List<Workshop>> GetUserWorkshops(int userId)
        {
            var registrations = await _context.Registrations
                .AsNoTracking()
                .Include(x => x.Workshop)
                .ThenInclude(x => x.Place)
                .Include(x => x.Workshop)
                .ThenInclude(x => x.Choreographer)
                .Include(x => x.User)
                .Where(x => x.UserId == userId && x.IsPresent == false)
                .Where(x => !x.IsDesired)
                .ToListAsync();

            return registrations.Count == 0 ? null : registrations.Select(x => x.Workshop).Where(x => !x.IsClosed).ToList();
        }

        public async Task CheckoutUsers(int userId, int workshopId)
        {
            var registration = await _context.Registrations
                .SingleAsync(x => x.UserId == userId && x.WorkshopId == workshopId);

            registration.IsPresent = true;

            await Update(registration);
        }

        public async Task Update(Registration entity)
        {
            _context.Registrations.Update(entity);

            await _context.SaveChangesAsync();
        }

        public Task<Registration> GetByUserAndWorkshopIds(int userId, int workshopId)
        {
            return _context.Registrations.FirstOrDefaultAsync(x => x.UserId == userId && x.WorkshopId == workshopId);
        }
    }
}