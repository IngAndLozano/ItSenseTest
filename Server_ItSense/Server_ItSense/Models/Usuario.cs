using System;
using System.Collections.Generic;

namespace Server_ItSense.Models;

public partial class Usuario
{
    public int Id { get; set; }

    public string Username { get; set; } = null!;

    public string PasswordHash { get; set; } = null!;

}
