using DancePlatform.BL.Models;
using System;

namespace DancePlatform.BL.Requests
{
    public class CreateChoreographerRequest
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public Style Style { get; set; }
        public string Link { get; set; }
        public int CreatedBy { get; set; }
    }
}
