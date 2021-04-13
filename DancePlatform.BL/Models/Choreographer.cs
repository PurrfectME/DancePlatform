using System;
using System.Collections.Generic;

namespace DancePlatform.BL.Models
{
    public class Choreographer
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTimeOffset DateOfBirth { get; set; }
        public string Description { get; set; }
        public byte[] Photo { get; set; }
        public Style Style { get; set; }
        public string Link { get; set; }

        public List<Workshop> Workshops { get; set; }
    }
}
