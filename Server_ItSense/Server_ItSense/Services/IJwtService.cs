using Server_ItSense.Models;

namespace Server_ItSense.Services
{
    public interface IJwtService
    {
        string GenerateJwtToken(Usuario user);
    }
}
