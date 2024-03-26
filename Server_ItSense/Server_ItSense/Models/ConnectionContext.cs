using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace Server_ItSense.Models;

public partial class ConnectionContext : DbContext
{
    public ConnectionContext()
    {
    }

    public ConnectionContext(DbContextOptions<ConnectionContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Producto> Productos { get; set; }

    public virtual DbSet<TokenRegistro> TokenRegistros { get; set; }

    public virtual DbSet<Usuario> Usuarios { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Producto>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("productos_pkey");

            entity.ToTable("productos");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.Estado)
                .HasColumnName("estado");
            entity.Property(e => e.Nombre)
                .HasMaxLength(100)
                .HasColumnName("nombre");
            entity.Property(e => e.TipoElaboracion)
                .HasMaxLength(50)
                .HasColumnName("tipo_elaboracion");
            entity.Property(e => e.Defecto)
                    .HasColumnName("defecto");
            entity.Property(e => e.FechaSalida)
                    .HasColumnName("fecha_salida");
            entity.Property(e => e.FechaIngreso)
                    .HasColumnName("fecha_ingreso");
        });

        modelBuilder.Entity<TokenRegistro>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("token_registros_pkey");

            entity.ToTable("token_registros");

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.FechaExpiracion)
                .HasColumnType("timestamp without time zone")
                .HasColumnName("fecha_expiracion");
            entity.Property(e => e.Token)
                .HasMaxLength(500)
                .HasColumnName("token");
            entity.Property(e => e.UserId).HasColumnName("user_id");

        });

        modelBuilder.Entity<Usuario>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("usuarios_pkey");

            entity.ToTable("usuarios");

            entity.HasIndex(e => e.Username, "usuarios_username_key").IsUnique();

            entity.Property(e => e.Id).HasColumnName("id");
            entity.Property(e => e.PasswordHash)
                .HasMaxLength(255)
                .HasColumnName("password_hash");
            entity.Property(e => e.Username)
                .HasMaxLength(50)
                .HasColumnName("username");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
