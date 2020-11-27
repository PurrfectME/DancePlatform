using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DancePlatform.DA
{
	public class ApplicationContext : IdentityDbContext<User, Role, int, UserClaim, UserRole, UserLogin, RoleClaim, UserToken>, IApplicationContext
	{
		public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
		{
		}

		public override DbSet<User> Users { get; set; }
		public override DbSet<Role> Roles { get; set; }
		public DbSet<Workshop> Workshops { get; set; }
		public DbSet<Registration> Registrations { get; set; }

		public Task SaveChangesAsync()
		{
			return base.SaveChangesAsync();
		}

		protected override void OnModelCreating(ModelBuilder builder)
		{
			builder.Entity<Role>().HasData(
				new Role
				{
					Id = 1,
					Name = "Admin",
					NormalizedName = "ADMIN"
				},
				new Role
				{
					Id = 2,
					Name = "User",
					NormalizedName = "USER"
				}
			);
		}
	}
}
