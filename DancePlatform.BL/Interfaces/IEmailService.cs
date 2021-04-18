using System.Threading.Tasks;

namespace DancePlatform.BL.Interfaces
{
    public interface IEmailService
    {
        Task SendEmail(string email, string subject, string message);
    }
}
