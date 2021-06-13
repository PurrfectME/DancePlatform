namespace DancePlatform.BL.Requests
{
    public class CreatePlaceRequest
    {
        public string StudioName { get; set; }
        public string Address { get; set; }
        public int CreatedBy { get; set; }
    }
}
