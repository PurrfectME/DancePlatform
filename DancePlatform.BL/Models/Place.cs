using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace DancePlatform.BL.Models
{
    public class Place
    {
        [Key]
        public int Id { get; set; }
        public string StudioName { get; set; }
        public string Address { get; set; }

        public List<Workshop> Workshops { get; set; }
    }
}
