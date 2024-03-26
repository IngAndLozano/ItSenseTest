using Server_ItSense.Models;

namespace Server_ItSense.Services
{
    public interface IUserService
    {
        Usuario Authenticate(string username, string password);
 
    }

}
