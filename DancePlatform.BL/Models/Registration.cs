namespace DancePlatform.BL.Models
{
	public class Registration
	{
		public int Id { get; set; }
		public int UserId { get; set; }
		public int WorkshopId { get; set; }
		public bool? IsPresent { get; set; }
		public int Coast { get; set; }

		public Workshop Workshop { get; set; }
		public User User { get; set; }
	}
}
