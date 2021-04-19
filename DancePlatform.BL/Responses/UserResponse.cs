using System;
using System.Collections.Generic;

namespace DancePlatform.BL.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Photo { get; set; }
        public string PhoneNumber { get; set; }
        public IList<string> Roles { get; set; }
    }
}
