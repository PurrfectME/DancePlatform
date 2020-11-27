using DancePlatform.BL.Models;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IApplicationContext
	{
		DbSet<Workshop> Workshops { get; set; }


		Task SaveChangesAsync();
		
	}
}
