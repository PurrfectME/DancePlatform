using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IPlaceService
    {
        Task<Place> Create(Place entity);
        Task<Place> Update(Place entity);
        Task Delete(Place entity);
        Task Delete(List<Place> entities);

        Task<List<Place>> GetAll();
        Task<Place> GetById(int id);
    }
}
