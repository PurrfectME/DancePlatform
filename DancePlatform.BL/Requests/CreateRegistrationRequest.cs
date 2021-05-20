namespace DancePlatform.BL.Requests
{
	public class CreateRegistrationRequest
	{
		public int UserId { get; set; }
		public int WorkshopId { get; set; }
		public bool IsPaid { get; set; }
        public bool IsDesired { get; set; }
    }
}
