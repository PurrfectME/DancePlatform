namespace DancePlatform.BL.Requests
{
	public class CreateRegistrationRequest
	{
		public int UserId { get; set; }
		public int[] WorkshopIds { get; set; }
		public bool? IsPresent { get; set; } = false;
		public int Coast { get; set; }
	}
}
