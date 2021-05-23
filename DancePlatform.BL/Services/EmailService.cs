using DancePlatform.BL.Interfaces;
using MailKit.Net.Smtp;
using MimeKit;
using System.Threading;
using System.Threading.Tasks;

namespace DancePlatform.BL.Services
{
    public class EmailService : IEmailService
    {
        public async Task SendEmail(string email, string subject, string message)
        {
            var emailMessage = new MimeMessage();

            emailMessage.From.Add(new MailboxAddress("Администрация сайта", "dance.evetns@gmail.com"));
            emailMessage.To.Add(new MailboxAddress("", email));
            emailMessage.Subject = subject;
            emailMessage.Body = new TextPart(MimeKit.Text.TextFormat.Html)
            {
                Text = message
            };

            using var client = new SmtpClient();
            //587
            await client.ConnectAsync("smtp.gmail.com", 465, true);
            await client.AuthenticateAsync("dance.evetns", "admin12345!");
            await client.SendAsync(emailMessage);

            await client.DisconnectAsync(true);
        }
    }
}
