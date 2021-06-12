using System;
using System.ComponentModel.DataAnnotations;

namespace DancePlatform.BL.Requests
{
    public class RegisterRequest
    {
        public string Username { get; set; }

        public string Password { get; set; }

        public string Email { get; set; }

        public bool IsOrganizer { get; set; }

        public string Name { get; set; }

        public string Surname { get; set; }


        public DateTimeOffset DateOfBirth { get; set; }
    }
}
