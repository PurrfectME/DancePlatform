using System;

namespace DancePlatform.BL.Models
{
	public class Workshop
	{
		public int Id { get; set; }
		public int Number { get; set; }
		public string Style { get; set; }
		public string Category { get; set; }
		public DateTimeOffset Date { get; set; }
		public string Name { get; set; }
		public float Price { get; set; }

		public User Choreographer { get; set; }
	}
}
