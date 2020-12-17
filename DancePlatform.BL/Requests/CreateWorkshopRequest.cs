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
        public string Name { get; set; }
        public float Price { get; set; }
        public string Choreographer { get; set; }
        public int MaximumPeople { get; set; }
        public int MinimumPeople { get; set; }
    }
}
