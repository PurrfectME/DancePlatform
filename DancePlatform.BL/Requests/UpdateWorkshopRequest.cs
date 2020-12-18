using System;
using System.Collections.Generic;
using System.Text;
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
        public string Name { get; set; }
        public float Price { get; set; }
        public string Choreographer { get; set; }

    }
}
