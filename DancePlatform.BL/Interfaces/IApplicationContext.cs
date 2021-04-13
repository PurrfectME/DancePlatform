using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IApplicationContext
	{
		DbSet<Workshop> Workshops { get; set; }
        DbSet<Registration> Registrations { get; set; }
        DbSet<User> Users { get; set; }
		DbSet<Place> Places { get; set; }
		DbSet<Choreographer> Choreographers { get; set; }

        Task SaveChangesAsync();
		
	}
}
