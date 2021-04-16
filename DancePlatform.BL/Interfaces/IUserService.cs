using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IUserService
    {
        Task UploadImage(byte[] imgBytes, int userId);
        Task<byte[]> GetUserPhoto(int id);

        Task DeleteUserPhoto(int id);
    }
}
