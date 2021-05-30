using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System;
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
                .Where(x => !x.IsClosed)
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

        public async Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId, DateTimeOffset? dateOfBirth = null)
        {
            var currentYear = DateTimeOffset.Now.Year;
            var userAge = dateOfBirth.HasValue ? currentYear - dateOfBirth.Value.Year : -1;

            var works = await _context.Workshops
                .AsNoTracking()
                .Include(x => x.Choreographer)
                .Include(x => x.Registrations)
                .Include(x => x.Place)
                .Where(x => !x.IsClosed)
                .Where(x => x.IsApprovedByModerator)
                .Where(x => x.CurrentUsersCount < x.MaxUsers)
                .Where(x => x.MinAge <= userAge)
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
                    if (!item.Registrations.Exists(x => x.UserId == userId))
                    {
                        result.Add(item);
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
                //.Where(x => x.Comment == null)
                .ToListAsync();
        }

        public async Task<List<Workshop>> GetUserDesiredWorkshops(int userId)
        {
            var registrations = await _context.Registrations
                .AsNoTracking()
                .Include(x => x.Workshop)
                .ThenInclude(x => x.Place)
                .Include(x => x.Workshop)
                .ThenInclude(x => x.Choreographer)
                .Include(x => x.User)
                .Where(x => x.UserId == userId && x.IsPresent == false)
                .Where(x => x.IsDesired)
                .ToListAsync();

            return registrations.Count == 0 ? null : registrations.Select(x => x.Workshop).Where(x => !x.IsClosed).ToList();
        }

        public async Task ApproveWorkshop(int workshopId)
        {
            var workshopToApprove = await _context.Workshops.FirstAsync(x => x.Id == workshopId);

            workshopToApprove.IsApprovedByModerator = true;

            await Update(workshopToApprove);
        }

        public async Task DeclineWorkshop(int workshopId, string comment)
        {
            var workshopToDecline = await _context.Workshops.FirstAsync(x => x.Id == workshopId);

            workshopToDecline.IsClosed = true;
            workshopToDecline.Comment = comment;

            await Update(workshopToDecline);
        }

        public Task<List<Workshop>> GetWorkshopsForApproval()
        {
            return _context.Workshops
               .AsNoTracking()
               .Include(x => x.Choreographer)
               .Include(x => x.Registrations)
               .Include(x => x.Place)
               .Where(x => !x.IsClosed)
               .Where(x => !x.IsApprovedByModerator)
               .ToListAsync();
        }
    }
}
