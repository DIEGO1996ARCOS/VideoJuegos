using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace BibliotecaVideoJuegos.Models
{
    public partial class DB_TEST_VDGContext : DbContext
    {
        public DB_TEST_VDGContext()
        {
        }

        public DB_TEST_VDGContext(DbContextOptions<DB_TEST_VDGContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Consola> Consolas { get; set; } = null!;
        public virtual DbSet<Genero> Generos { get; set; } = null!;
        public virtual DbSet<VideoJuego> VideoJuegos { get; set; } = null!;
        public virtual DbSet<ViewVideoJuego> ViewVideoJuegos { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=(local); DataBase=DB_TEST_VDG;Integrated Security=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Consola>(entity =>
            {
                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<Genero>(entity =>
            {
                entity.Property(e => e.Nombre)
                    .HasMaxLength(200)
                    .HasColumnName("nombre");
            });

            modelBuilder.Entity<VideoJuego>(entity =>
            {
                entity.Property(e => e.Anio).HasColumnName("anio");

                entity.Property(e => e.Calificacion).HasColumnName("calificacion");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(200)
                    .HasColumnName("titulo");

                entity.HasOne(d => d.IdConsolaNavigation)
                    .WithMany(p => p.VideoJuegos)
                    .HasForeignKey(d => d.IdConsola)
                    .HasConstraintName("FK__VideoJueg__IdCon__48CFD27E");

                entity.HasOne(d => d.IdGeneroNavigation)
                    .WithMany(p => p.VideoJuegos)
                    .HasForeignKey(d => d.IdGenero)
                    .HasConstraintName("FK__VideoJueg__IdGen__49C3F6B7");
            });

            modelBuilder.Entity<ViewVideoJuego>(entity =>
            {
                entity.HasNoKey();

                entity.ToView("viewVideoJuegos");

                entity.Property(e => e.Anio).HasColumnName("anio");

                entity.Property(e => e.Calificacion).HasColumnName("calificacion");

                entity.Property(e => e.Descripcion).HasColumnName("descripcion");

                entity.Property(e => e.IdConsola).HasColumnName("idConsola");

                entity.Property(e => e.IdGenero).HasColumnName("idGenero");

                entity.Property(e => e.NombreConsola)
                    .HasMaxLength(200)
                    .HasColumnName("nombreConsola");

                entity.Property(e => e.NombreGenero)
                    .HasMaxLength(200)
                    .HasColumnName("nombreGenero");

                entity.Property(e => e.Titulo)
                    .HasMaxLength(200)
                    .HasColumnName("titulo");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
