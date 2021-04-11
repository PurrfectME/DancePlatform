using DancePlatform.BL.Models;
using System;

namespace DancePlatform.BL.Requests
{
    public class CreateWorkshopRequest
    {
        public int NumberOfPeople { get; set; }
        public Category Category { get; set; }
        public Style Style { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Place { get; set; }
        public float Price { get; set; }
        public int ChoreographerId { get; set; }
        public int MaxUsers { get; set; }
        public int MinAge { get; set; }
    }
}
