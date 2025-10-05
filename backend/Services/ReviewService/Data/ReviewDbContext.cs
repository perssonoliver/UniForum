using Microsoft.EntityFrameworkCore;
using ReviewService.Models;

namespace ReviewService.Data
{
    public class ReviewDbContext : DbContext
    {
        public ReviewDbContext(DbContextOptions<ReviewDbContext> options) : base(options) { }

        public DbSet<Review> Reviews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Review>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.Property(r => r.CourseCode)
                    .IsRequired()
                    .HasMaxLength(10);

                entity.Property(r => r.StudentId)
                    .IsRequired();
                
                entity.Property(r => r.Rating)
                    .IsRequired();
                
                entity.Property(r => r.Title)
                    .HasMaxLength(200);
                
                entity.Property(r => r.Content)
                    .HasMaxLength(2000);

                entity.Property(r => r.LikesCount)
                    .HasDefaultValue(0);

                entity.Property(r => r.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");

                entity.Property(r => r.IsAnonymous)
                    .HasDefaultValue(false);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
