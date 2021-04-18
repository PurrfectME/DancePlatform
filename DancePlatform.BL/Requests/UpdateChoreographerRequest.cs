using DancePlatform.BL.Models;
using System;

namespace DancePlatform.BL.Requests
{
    public class UpdateChoreographerRequest
    {
        public Style Style { get; set; }
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
    }
}
