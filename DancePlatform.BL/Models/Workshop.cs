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
        public string Name { get; set; }
        public float Price { get; set; }
        public string Choreographer { get; set; }

        public List<Registration> Registrations { get; set; }
    }
}