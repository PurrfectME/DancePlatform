using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

namespace DancePlatform.API.Controllers
{
    [Authorize(Roles = "Admin")]
    [Route("admin")]
    [ApiController]
    public class AdminController : ControllerBase
    {

    }
}
