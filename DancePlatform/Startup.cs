using DancePlatform.DA;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using DancePlatform.BL.Models;
using Microsoft.AspNetCore.Identity;

namespace DancePlatform
{
	public class Startup
	{
		public Startup(IConfiguration configuration)
		{
			Configuration = configuration;
		}

		public IConfiguration Configuration { get; }

		// This method gets called by the runtime. Use this method to add services to the container.
		public void ConfigureServices(IServiceCollection services)
		{
			services.AddDbContext<ApplicationContext>(options =>
				options.UseSqlServer(Configuration.GetConnectionString("DancePlatform")));

			services.AddIdentity<User, Role>()
				.AddEntityFrameworkStores<ApplicationContext>();

			services.Configure<IdentityOptions>(options =>
			{
				// Default Password settings.
				options.Password.RequireDigit = false;
				options.Password.RequireLowercase = true;
				options.Password.RequireNonAlphanumeric = false;
				options.Password.RequireUppercase = false;
				options.Password.RequiredLength = 5;
				options.Password.RequiredUniqueChars = 0;
			});

			services.AddControllers();
		}

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<User> userManager)
		{
			if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseHttpsRedirection();

			app.UseRouting();

			app.UseAuthentication();

			app.UseAuthorization();

			SeedUsers(userManager);


			app.UseEndpoints(endpoints =>
			{
				endpoints.MapControllers();
			});
		}

		private static void SeedUsers(UserManager<User> manager)
		{
			if (manager.FindByNameAsync("Admin").Result == null)
			{
				var admin = new User
				{
					UserName = "Admin",
				};

				if((manager.CreateAsync(admin, "admin").Result).Succeeded)
				{
					manager.AddToRoleAsync(admin,
								"Admin").Wait();
				}
			}
		}
	}
}
