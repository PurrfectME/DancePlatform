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
        Task Delete(List<Registration> entities);

        Task<List<Registration>> GetAll();
        Task<List<Registration>> GetById(int[] ids);
        Task<List<Registration>> GetUserRegistrations(int userId);

        Task<List<Workshop>> GetUserWorkshops(int userId);
    }
}