using System;
using System.Text;
using DancePlatform.BL.Interfaces;
using DancePlatform.BL.Models;
using DancePlatform.BL.Services;
using DancePlatform.DA;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;

namespace DancePlatform.API
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
				.AddEntityFrameworkStores<ApplicationContext>()
				.AddDefaultTokenProviders();


            services.AddScoped<IApplicationContext, ApplicationContext>();

			services.AddScoped<IWorkshopService, WorkshopService>();
			services.AddScoped<IRegistrationService, RegistrationService>();
            services.AddScoped<IChoreographerService, ChoreographerService>();
            services.AddScoped<IPlaceService, PlaceService>();
            services.AddScoped<IProfileService, ProfileService>();
            services.AddScoped<IEmailService, EmailService>();

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

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = false,
                    ValidateIssuerSigningKey = false,
                    ValidateAudience = false,
                    ValidAudience = Configuration["JWT:ValidAudience"],
                    ValidIssuer = Configuration["JWT:ValidIssuer"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"])),
                    ValidateLifetime = true,
                    ClockSkew = TimeSpan.FromMinutes(1),
                };
            });


            services.AddAuthorization(options =>
            {
                options.AddPolicy("ORGANIZER",
                    policy => policy.RequireRole("ORGANIZER"));

                options.AddPolicy("MODERATOR",
                    policy => policy.RequireRole("MODERATOR"));

                options.AddPolicy("USER",
                    policy => policy.RequireRole("USER"));
            });


            services.AddCors(options =>
            {
                options.AddDefaultPolicy(
                    builder =>
                    {
                        builder.AllowAnyOrigin();
                        builder.AllowAnyHeader();
                        builder.AllowAnyMethod();
                    });
            });

            services.AddControllers(options =>
            {
                options.RespectBrowserAcceptHeader = true;
            })
            .AddNewtonsoftJson(options =>
                {
                    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
                }
            );
        }

		// This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
		public void Configure(IApplicationBuilder app, IWebHostEnvironment env, UserManager<User> userManager)
		{
            app.UseDefaultFiles();
            app.UseStaticFiles();
            
            if (env.IsDevelopment())
			{
				app.UseDeveloperExceptionPage();
			}

			app.UseRouting();

            app.UseCors();
            
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
            if (manager.FindByNameAsync("Moderator").Result != null) return;
            var moderator = new User
            {
                UserName = "Moderator",
                Email = "moderator@gmail.com",
                EmailConfirmed = true
            };

            if ((manager.CreateAsync(moderator, "moderator").Result).Succeeded)
            {
                manager.AddToRoleAsync(moderator,
                    "Moderator").Wait();
            }
        }
    }
}
