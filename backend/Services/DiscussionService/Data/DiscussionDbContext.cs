using Microsoft.EntityFrameworkCore;
using DiscussionService.Models;

namespace DiscussionService.Data
{
    public class DiscussionDbContext : DbContext
    {
        public DiscussionDbContext(DbContextOptions<DiscussionDbContext> options) : base(options) { }

        public DbSet<Discussion> Discussions { get; set; }
        public DbSet<Comment> Comments { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Discussion>(entity =>
            {
                entity.HasKey(r => r.Id);

                entity.Property(r => r.CourseId)
                    .IsRequired();

                entity.Property(r => r.UserId)
                    .IsRequired();

                entity.Property(r => r.Title)
                    .IsRequired();

                entity.Property(r => r.Content)
                    .IsRequired();
                
                entity.Property(r => r.Title)
                    .HasMaxLength(200);
                
                entity.Property(r => r.Content)
                    .HasMaxLength(2000);

                entity.Property(r => r.LikesCount)
                    .HasDefaultValue(0);

                entity.Property(r => r.CommentsCount)
                    .HasDefaultValue(0);

                entity.Property(r => r.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");
            });

            modelBuilder.Entity<Comment>(entity =>
            {
                entity.HasKey(c => c.Id);

                entity.Property(c => c.DiscussionId)
                    .IsRequired();

                entity.Property(c => c.UserId)
                    .IsRequired();

                entity.Property(c => c.Content)
                    .IsRequired()
                    .HasMaxLength(1000);

                entity.Property(c => c.LikesCount)
                    .HasDefaultValue(0);

                entity.Property(c => c.CreatedAt)
                    .HasDefaultValueSql("GETUTCDATE()");
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
