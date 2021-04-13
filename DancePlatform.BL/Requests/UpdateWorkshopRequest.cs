using System;
using DancePlatform.BL.Models;

namespace DancePlatform.BL.Requests
{
    public class UpdateWorkshopRequest
    {
        public int Id { get; set; }
        public int NumberOfPeople { get; set; }
        public Style Style { get; set; }
        public Category Category { get; set; }
        public DateTimeOffset Date { get; set; }
        public DateTimeOffset Time { get; set; }
        public int PlaceId { get; set; }
        public float Price { get; set; }
        public int ChoreographerId { get; set; }
        public int MinAge { get; set; }
        public int MaxUsers { get; set; }


    }
}
