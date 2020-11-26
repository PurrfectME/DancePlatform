using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace DancePlatform.DA
{
	public class ApplicationContext : IdentityDbContext<User, Role, int>
	{
		public ApplicationContext(DbContextOptions options) : base(options)
		{
		}

		public override DbSet<User> Users { get; set; }
		public override DbSet<Role> Roles { get; set; }
		public DbSet<Workshop> Workshops { get; set; }
		public DbSet<Registration> Registrations { get; set; }


	}
}
