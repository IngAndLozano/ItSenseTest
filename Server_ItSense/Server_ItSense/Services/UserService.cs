using Server_ItSense.Models;

namespace Server_ItSense.Services
{
    public class UserService : IUserService
    {
        private readonly ConnectionContext _context;

        public UserService(ConnectionContext context)
        {
            _context = context;
        }

        public Usuario Authenticate(string username, string password)
        {
            // Buscar el usuario en la base de datos
            var user = _context.Usuarios.SingleOrDefault(x => x.Username == username && x.PasswordHash == password);

            // Si el usuario no existe o la contraseña es incorrecta, retornar null
            if (user == null)
                return null;

            // Autenticación exitosa
            return user;
        }
    }
}
