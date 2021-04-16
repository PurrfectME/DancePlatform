using DancePlatform.BL.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IChoreographerService
    {
        Task<Choreographer> Create(Choreographer entity);
        Task Update(Choreographer entity);
        Task Delete(Choreographer entity);
        Task Delete(List<Choreographer> entities);

        Task<List<Choreographer>> GetAll();
        Task<Choreographer> GetById(int id);
    }
}
