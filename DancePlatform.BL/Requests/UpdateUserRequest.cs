using System;

namespace DancePlatform.BL.Requests
{
    public class UpdateUserRequest
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string PhoneNumber { get; set; }
    }
}
