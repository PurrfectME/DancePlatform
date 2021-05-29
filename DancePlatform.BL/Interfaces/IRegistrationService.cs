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
        Task<Registration> GetById(int id);
        Task<List<Registration>> GetUserRegistrations(int userId);
        Task<List<Workshop>> GetUserWorkshops(int userId);
        Task<Registration> GetByUserAndWorkshopIds(int userId, int workshopId);
        Task<List<Workshop>> GetUserVisitedWorkshops(int userId);
        Task RemoveFromDesired(int userId, int workshopId);
        Task CheckoutUsers(int userId, int workshopId);
    }
}