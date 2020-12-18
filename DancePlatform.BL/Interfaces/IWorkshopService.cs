using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IWorkshopService
	{
		Task Create(Workshop entity);
		Task Update(Workshop entity);
		Task Delete(Workshop entity);

		Task<List<Workshop>> GetAll();
        Task<List<User>> GetWorkshopUsers(int workshopId);
        Task<Workshop> GetById(int id);

        Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId);
    }
}
