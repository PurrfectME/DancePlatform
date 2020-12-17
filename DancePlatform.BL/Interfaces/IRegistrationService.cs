using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
	public interface IRegistrationService
	{
		Task Create(Registration entity);
		Task Update(Registration entity);
		Task Delete(Registration entity);

		Task<List<Registration>> GetAll();
		Task<Registration> GetById(int id);
        Task<List<Registration>> GetUserRegistrations(int userId);
    }
}
