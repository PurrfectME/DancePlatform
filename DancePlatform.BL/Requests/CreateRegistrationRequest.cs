namespace DancePlatform.BL.Requests
{
	public class CreateRegistrationRequest
	{
		public int UserId { get; set; }
		public int WorkshopId { get; set; }
		public bool? IsPresent { get; set; } = false;
		public bool? IsPaid { get; set; } = false;
		public int Coast { get; set; }
	}
}
