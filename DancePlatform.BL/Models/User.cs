using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

	public class UserLogin : IdentityUserLogin<int>
	{
		public int Id { get; set; }
	}

	public class UserRole : IdentityUserRole<int>
	{
		public int Id { get; set; }
	}

	public class RoleClaim : IdentityRoleClaim<int>
	{
	}

	public class UserClaim : IdentityUserClaim<int>
	{
	}

	public class UserToken : IdentityUserToken<int>
	{
		public int Id { get; set; }
	}
}
