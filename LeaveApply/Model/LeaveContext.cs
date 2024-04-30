using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace LeaveApply.Model;

public partial class LeaveContext : DbContext
{
    public LeaveContext()
    {
    }

    public LeaveContext(DbContextOptions<LeaveContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Employee> Employees { get; set; }

    public virtual DbSet<LeaveRequest> LeaveRequests { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=DESKTOP-H3HA538;Database=LeaveApply;Trusted_Connection=True;TrustServerCertificate=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Employee>(entity =>
        {
            entity.HasKey(e => e.EmpId).HasName("PK__Employee__AF2DBB99CA000F6D");

            entity.Property(e => e.EmpId).ValueGeneratedNever();
        });

        modelBuilder.Entity<LeaveRequest>(entity =>
        {
            entity.HasKey(e => e.LevId).HasName("PK__LeaveReq__AAF9F436F23A9B3F");

            entity.Property(e => e.Status).HasDefaultValue("Pending");
            entity.Property(e => e.TotalDays).HasComputedColumnSql("(datediff(day,[FromDate],[ToDate])+(1))", false);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
