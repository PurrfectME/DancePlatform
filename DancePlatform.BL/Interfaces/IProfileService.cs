using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IProfileService
    {
        Task UploadImage(byte[] imgBytes, int userId);
        Task<byte[]> GetUserPhoto(int id);

        Task DeleteUserPhoto(int id);
    }
}
