using DancePlatform.BL.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
    public class ProfileService : IProfileService
    {
        private readonly IApplicationContext _context;

        public ProfileService(IApplicationContext context)
        {
            _context = context;
        }

        public async Task DeleteUserPhoto(int userId)
        {
            var user = await _context.Users.FirstAsync(x => x.Id == userId);

            user.Photo = null;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();
        }

        public async Task<byte[]> GetUserPhoto(int id)
        {
            return (await _context.Users.FirstAsync(x => x.Id == id)).Photo;
        }

        public async Task UploadImage(byte[] imgBytes, int userId)
        {
            var user = await _context.Users.FirstAsync(x => x.Id == userId);

            user.Photo = imgBytes;

            _context.Users.Update(user);

            await _context.SaveChangesAsync();
        }
    }
}
