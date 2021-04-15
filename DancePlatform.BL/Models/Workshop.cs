using System;
using System.Collections.Generic;

namespace DancePlatform.BL.Models
{
    public class Workshop
    {
        public int Id { get; set; }
        public Style Style { get; set; }
        public Category Category { get; set; }
        public DateTimeOffset Date { get; set; }
        public DateTimeOffset Time { get; set; }
        public byte[] Photo { get; set; }
        public float Price { get; set; }
        public int MinAge { get; set; }
        public int MaxUsers { get; set; }
        public bool IsApprovedByAdmin { get; set; }
        public string CreatedBy { get; set; }

        public int PlaceId { get; set; }
        public Place Place { get; set; }
        public int ChoreographerId { get; set; }
        public Choreographer Choreographer { get; set; }
        public List<Registration> Registrations { get; set; }
    }
}