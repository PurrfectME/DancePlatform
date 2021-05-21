using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IWorkshopService
	{
		Task<Workshop> Create(Workshop entity);
		Task<Workshop> Update(Workshop entity);
		Task Delete(Workshop entity);

		Task<List<Workshop>> GetAll();
        Task<List<User>> GetWorkshopUsers(int workshopId);
        Task<Workshop> GetById(int id);
		Task<List<Workshop>> GetUserDesiredWorkshops(int userId);
		Task<List<Workshop>> GetClosed();
		Task<List<Workshop>> GetAvailableWorkshopsForUser(int userId);

		Task ApproveWorkshop(int workshopId);
		Task DeclineWorkshop(int workshopId, string comment);

	}
}
