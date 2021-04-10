using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IPlaceService
    {
        Task Create(Place entity);
        Task Update(Place entity);
        Task Delete(Place entity);
        Task Delete(List<Place> entities);
    }
}
