using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using DancePlatform.BL.Models;
using DancePlatform.BL.Requests;
using DancePlatform.BL.Responses;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using DancePlatform.BL.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Web;

namespace DancePlatform.API.Controllers
{
    [Route("auth")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly UserManager<User> _userManager;
        private readonly IConfiguration _configuration;
        private readonly IEmailService _emailService;

        public AuthenticationController(UserManager<User> userManager, IConfiguration configuration, IEmailService emailService)
        {
            _userManager = userManager;
            _configuration = configuration;
            _emailService = emailService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null || !await _userManager.CheckPasswordAsync(user, model.Password))
                return Unauthorized();

            if (!user.EmailConfirmed)
            {
                return StatusCode(StatusCodes.Status401Unauthorized,
                    new BaseResponse
                    { Status = "Error", Message = "Подтвердите свою почту" });
            }

            var userRoles = await _userManager.GetRolesAsync(user);

            var authClaims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.UserName),
            };

            authClaims.AddRange(userRoles.Select(role => new Claim(ClaimsIdentity.DefaultRoleClaimType, role)));

            var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

            var token = new JwtSecurityToken(
                issuer: "issuer",
                audience: "audience",
                expires: DateTime.Now.AddDays(10),
                claims: authClaims,
                signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
            );

            var userForResponse = new UserResponse
            {
                Email = user.Email,
                Id = user.Id,
                UserName = user.UserName,
                Roles = userRoles,
                DateOfBirth = user.DateOfBirth,
                Name = user.Name,
                Surname = user.Surname,
                PhoneNumber = user.PhoneNumber,
                Photo = user.Photo == null ? null : Convert.ToBase64String(user.Photo),
            };

            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),
                user = userForResponse,
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest model)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest, new BaseResponse { Status = "Error", Message = "Пользователь уже существует!" });

            var user = new User
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Name = model.Name,
                Surname = model.Surname,
                DateOfBirth = model.DateOfBirth
            };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (!result.Succeeded)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new BaseResponse
                    { Status = "Error", Message = "Ошибка создания пользователя, проверьте введённые данные" });
            }

            await _userManager.AddToRoleAsync(user, model.IsOrganizer ? "Organizer" : "User");

            // генерация токена для пользователя
            var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);

            var token = HttpUtility.UrlEncode(code);

            var link = $"https://localhost:44305/auth/confirm-email?userId={user.Id}&code={token}";

            await _emailService.SendEmail(model.Email, "Confirm your account",
                $"Подтвердите регистрацию, перейдя по ссылке: <a href='{link}'>link</a>");

            return Ok(new BaseResponse
            { Status = "Success", Message = "Для завершения регистрации проверьте электронную почту и перейдите по ссылке, указанной в письме!" });
        }

        [AllowAnonymous]
        [HttpGet("confirm-email")]
        public async Task<IActionResult> ConfirmEmail([FromQuery] string userId, [FromQuery] string code)
        {
            //var correctCode = code.Replace(' ', '+');

            if (userId == null || code == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                    new BaseResponse
                    { Status = "Error", Message = "Ошибка подтверждения почты" });
            }
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return StatusCode(StatusCodes.Status400BadRequest,
                   new BaseResponse
                   { Status = "Error", Message = "Такого пользователя нет" });
            }

            var result = await _userManager.ConfirmEmailAsync(user, code);

            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status400BadRequest,
                   new BaseResponse
                   { Status = "Error", Message = "Ошибка подтверждения почты" });

            return Redirect("http://localhost:3000/login");
        }
    }
}
