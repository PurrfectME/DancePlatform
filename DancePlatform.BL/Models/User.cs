using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DancePlatform.BL.Models
{
	[Table("User")]
	public class User : IdentityUser<int>
	{
		public List<Registration> Registrations { get; set; }
	}

	[Table("Role")]
	public class Role : IdentityRole<int>
	{
	}
}
