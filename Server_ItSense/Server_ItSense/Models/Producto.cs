using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace Server_ItSense.Models;

public partial class Producto
{
    [Key]
    //[DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    public string TipoElaboracion { get; set; } = null!;

    public string Nombre { get; set; } = null!;

    public bool Estado { get; set; } 
    public bool Defecto { get; set; }
    public DateTime? FechaSalida { get; set; } 
    public DateTime FechaIngreso { get; set; }
}
