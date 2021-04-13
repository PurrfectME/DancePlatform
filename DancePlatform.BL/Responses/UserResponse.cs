using System.Collections.Generic;

namespace DancePlatform.BL.Responses
{
    public class UserResponse
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public IList<string> Roles { get; set; }
    }
}
