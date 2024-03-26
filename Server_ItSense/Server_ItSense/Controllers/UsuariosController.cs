using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Server_ItSense.Models;
using Server_ItSense.Services;

namespace Server_ItSense.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuariosController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IJwtService _jwtService;

        public UsuariosController(IUserService userService, IJwtService jwtService)
        {
            _userService = userService;
            _jwtService = jwtService;
        }

        // POST: api/Usuarios/login
        [HttpPost("login")]
        public IActionResult Login(Usuario model)
        {
            // Verificar si el usuario y la contraseña son válidos
            var user = _userService.Authenticate(model.Username, model.PasswordHash);

            if (user == null)
            {
                // Usuario no encontrado o credenciales inválidas
                return Unauthorized();
            }

            // Generar un token JWT para el usuario autenticado
            var token = _jwtService.GenerateJwtToken(user);

            // Devolver el token JWT al cliente
            return Ok(new { token });
        }
    }
}
